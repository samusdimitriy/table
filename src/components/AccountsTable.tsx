import { useState, useEffect } from 'react';
import Table from './Table';
import { fetchAccountData, AccountData } from '../data/api';

import './styles.css';

const AccountsTable = () => {
  const [accountsData, setAccountsData] = useState<AccountData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAccountData();
        setAccountsData(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="table-container">
      <h1>Accounts</h1>
      <Table
        data={accountsData}
        columns={[
          { key: 'accountId', label: 'Account ID' },
          { key: 'email', label: 'Email' },
          { key: 'creationDate', label: 'Creation Date' },
        ]}
        loading={loading}
        navigatePath="/profiles"
      />
    </div>
  );
};

export default AccountsTable;
