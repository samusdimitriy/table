// Table.tsx
import React, { useState } from 'react';
import { Table as BootstrapTable, Button } from 'react-bootstrap';

interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T]) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  sortFunction?: (data: T[], options: SortOptions<T>) => T[];
  itemsPerPage?: number;
  onSort: (key: keyof T) => void;
}

interface SortOptions<T> {
  key: keyof T | null;
  order: 'asc' | 'desc';
}

const Table = <T,>({
  data,
  columns,
  sortFunction,
  itemsPerPage = 3,
  onSort,
}: TableProps<T>) => {
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSort = (key: keyof T) => {
    onSort(key);
    setSortBy(key);
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const sortedData = sortFunction
    ? sortFunction(data, { key: sortBy, order: sortOrder })
    : [...data];

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleData = sortedData.slice(startIndex, endIndex);

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
          {visibleData.map((item, index) => (
            <tr key={String(item[columns[0]?.key]) || index}>
              {columns.map((column) => (
                <td key={String(column.key)}>
                  {column.render
                    ? column.render(item[column.key])
                    : String(item[column.key])}
                </td>
              ))}
            </tr>
          ))}
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
