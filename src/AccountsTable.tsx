// AccountsTable.tsx
import React, { useState, useEffect } from 'react';
import Table from './Table'; // Adjust the path accordingly
import { sortData } from './sortUtils'; // Adjust the path accordingly
import accountsData from './data/accounts';
import './styles.css';

type Account = {
  accountId: string;
  email: string;
  authToken: string;
  creationDate: string;
};

const AccountsTable: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [sortInfo, setSortInfo] = useState<{
    key: keyof Account | null;
    order: 'asc' | 'desc';
  }>({ key: null, order: 'asc' });
  const [itemsPerPage] = useState<number>(3);

  useEffect(() => {
    setAccounts(accountsData);
  }, []);

  const handleSort = (key: keyof Account) => {
    setSortInfo((prev) => ({
      key,
      order: prev.key === key ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc',
    }));
  };

  const sortedAccounts = sortData(accounts, sortInfo);

  return (
    <div className="table-container">
      <h1>Accounts</h1>
      <Table
        data={sortedAccounts}
        columns={[
          { key: 'accountId', label: 'Account ID' },
          { key: 'email', label: 'Email' },
          { key: 'creationDate', label: 'Creation Date' },
        ]}
        sortFunction={sortData}
        itemsPerPage={itemsPerPage}
        onSort={handleSort}
      />
    </div>
  );
};

export default AccountsTable;
