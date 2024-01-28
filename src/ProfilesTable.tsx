import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from './Table';
import { fetchDataForTable, TableData } from './data/api';

import './styles.css';

const ProfilesTable = () => {
  const { accountId } = useParams<{ accountId: string | undefined }>();
  const [profiles, setProfiles] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataForTable('profiles');
        setProfiles(data);
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
  }, [accountId]);

  return (
    <div className="table-container">
      <h1>Profiles</h1>
      <Table
        data={profiles}
        columns={[
          { key: 'profileId', label: 'Profile ID' },
          { key: 'country', label: 'Country' },
          { key: 'marketplace', label: 'Marketplace' },
        ]}
        navigatePath="/campaigns"
        loading={loading}
      />
    </div>
  );
};

export default ProfilesTable;
