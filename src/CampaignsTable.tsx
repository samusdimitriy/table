import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Table from './Table';
import campaignsData from './data/campaigns';
import './styles.css';

const CampaignsTable = () => {
  const { profileId } = useParams();
  const [campaigns, setCampaigns] = useState<
    {
      campaignId: string;
      profileId: string;
      clicks: number;
      cost: number;
      date: string;
    }[]
  >([]);

  useEffect(() => {
    const filteredCampaigns = campaignsData.filter(
      (campaign) => campaign.profileId === profileId
    );
    setCampaigns(filteredCampaigns);
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
      />
    </div>
  );
};

export default CampaignsTable;
