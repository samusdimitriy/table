import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from './Table';
import { fetchCampaignData, CampaignData } from '../data/api';
import './styles.css';

const CampaignsTable = () => {
  const { profileId } = useParams();
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCampaignData();
        setCampaigns(data);
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
  }, [profileId]);

  return (
    <div className="table-container">
      <h1>Campaigns</h1>
      <Table
        data={campaigns}
        columns={[
          { key: 'campaignId', label: 'Campaign ID' },
          { key: 'clicks', label: 'Clicks' },
          { key: 'cost', label: 'Cost' },
          { key: 'date', label: 'Date' },
        ]}
        loading={loading}
      />
    </div>
  );
};

export default CampaignsTable;
