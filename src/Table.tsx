// Table.tsx
import React, { useState } from 'react';
import { Table as BootstrapTable, Button } from 'react-bootstrap';
import { sortData, SortOptions } from './sortUtils';
import { useNavigate } from 'react-router-dom';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  navigatePath?: string;
}

const Table = <T,>({ data, columns, navigatePath }: TableProps<T>) => {
  const [sortInfo, setSortInfo] = useState<SortOptions<T>>({
    key: null,
    order: 'asc',
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(3);
  const navigate = useNavigate();

  const handleSort = (key: keyof T) => {
    setSortInfo((prev) => ({
      key,
      order: prev.key === key ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc',
    }));
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
  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const renderedData = sortedData.slice(startIndex, endIndex);

  return (
    <div>
      <BootstrapTable striped bordered hover>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                onClick={() => handleSort(column.key)}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {renderedData.map((item, index) => (
            <tr
              key={String(item[columns[0].key]) || index}
              onClick={() => handleRowClick(item)}
            >
              {columns.map((column) => (
                <td key={String(column.key)}>
                  {column.render
                    ? column.render(item[column.key] as T[keyof T])
                    : String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
          {renderedData.length === 0 && (
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
          Page {currentPage} of {totalPages}{' '}
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
