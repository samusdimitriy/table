// ProfilesTable.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from './Table';
import profilesData from './data/profiles';
import './styles.css';

const ProfilesTable = () => {
  const { accountId } = useParams();
  const [profiles, setProfiles] = useState<
    {
      profileId: string;
      accountId: string;
      country: string;
      marketplace: string;
    }[]
  >([]);

  useEffect(() => {
    const filteredProfiles = profilesData.filter(
      (profile) => profile.accountId === accountId
    );
    setProfiles(filteredProfiles);
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
        navigatePath="/campaigns" // Указываем путь роутинга
      />
    </div>
  );
};

export default ProfilesTable;
