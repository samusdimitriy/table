export interface AccountData {
  accountId: string;
  email: string;
  authToken: string;
  creationDate: string;
}

export interface CampaignData {
  campaignId: string;
  profileId: string;
  clicks: number;
  cost: number;
  date: string;
}

export interface ProfileData {
  profileId: string;
  accountId: string;
  country: string;
  marketplace: string;
}

const API_BASE_URL = 'https://65b52a9841db5efd28676280.mockapi.io';

export const fetchAccountData = async (): Promise<AccountData[]> => {
  const apiUrl = `${API_BASE_URL}/accounts`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch account data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCampaignData = async (): Promise<CampaignData[]> => {
  const apiUrl = `${API_BASE_URL}/campaigns`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch campaign data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchProfileData = async (): Promise<ProfileData[]> => {
  const apiUrl = `${API_BASE_URL}/profiles`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch profile data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
