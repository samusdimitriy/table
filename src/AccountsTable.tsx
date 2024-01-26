import { useState, useEffect } from 'react';
import Table from './Table';
import accountsData from './data/accounts';
import './styles.css';

const AccountsTable = () => {
  const [accounts, setAccounts] = useState<
    {
      accountId: string;
      email: string;
      authToken: string;
      creationDate: string;
    }[]
  >([]);

  useEffect(() => {
    setAccounts(accountsData);
  }, []);

  return (
    <div className="table-container">
      <h1>Accounts</h1>
      <Table
        data={accounts}
        columns={[
          { key: 'accountId', label: 'Account ID' },
          { key: 'email', label: 'Email' },
          { key: 'creationDate', label: 'Creation Date' },
        ]}
        navigatePath="/profiles"
      />
    </div>
  );
};

export default AccountsTable;
