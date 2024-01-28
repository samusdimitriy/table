import React, { useState } from 'react';
import { Table as BootstrapTable, Button, Spinner } from 'react-bootstrap';
import { sortData, SortOptions } from '../utils/sortUtils';
import { useNavigate } from 'react-router-dom';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FormControl, InputGroup } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  navigatePath?: string;
  loading?: boolean;
}

const Table = <T,>({ data, columns, navigatePath, loading }: TableProps<T>) => {
  const [sortInfo, setSortInfo] = useState<SortOptions<T>>({
    key: null,
    order: 'asc',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  const [activeColumn, setActiveColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterValue, setFilterValue] = useState<string>('');

  const navigate = useNavigate();

  const handleSort = (key: keyof T | null) => {
    if (activeColumn !== key) {
      setSortInfo({ key, order: 'asc' });
      setSortOrder('asc');
    } else {
      setSortInfo((prev) => ({
        key,
        order: prev.order === 'asc' ? 'desc' : 'asc',
      }));
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    }
    setCurrentPage(1);
    setActiveColumn(key);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleRowClick = (item: T) => {
    if (navigatePath) {
      navigate(`${navigatePath}/${item[columns[0].key]}`);
    }
  };

  const sortedData = sortData(data, sortInfo);

  const filteredData = sortedData.filter((item) =>
    columns.some((column) =>
      String(item[column.key]).toLowerCase().includes(filterValue.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <InputGroup className="mb-3 w-25">
        <FormControl
          placeholder="Filter data"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </InputGroup>
      <BootstrapTable striped bordered hover>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                onClick={() => handleSort(column.key)}
                style={{ position: 'relative' }}
              >
                {column.label}{' '}
                {activeColumn === column.key && (
                  <div
                    style={{
                      position: 'absolute',
                      display: 'inline-block',
                      marginLeft: '5px',
                    }}
                  >
                    {sortOrder === 'asc' ? <FaArrowDown /> : <FaArrowUp />}
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                <Spinner animation="border" variant="secondary" />
              </td>
            </tr>
          ) : (
            visibleData.map((item, index) => (
              <tr
                key={String(item[columns[0].key]) || index}
                onClick={() => handleRowClick(item)}
              >
                {columns.map((column) => (
                  <td key={String(column.key)}>
                    {column.render
                      ? column.render(item[column.key])
                      : String(item[column.key])}
                  </td>
                ))}
              </tr>
            ))
          )}
          {visibleData.length === 0 && !loading && (
            <tr>
              <td colSpan={columns.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </BootstrapTable>

      <div className="pagination-container">
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <span>
          {' '}
          Page {currentPage} of {totalPages || 1}{' '}
        </span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Table;
