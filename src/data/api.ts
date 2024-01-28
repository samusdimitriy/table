export interface TableData {
  [key: string]: string;
}

const API_BASE_URL = 'https://65b52a9841db5efd28676280.mockapi.io';

export const fetchDataForTable = async (
  tableType: string
): Promise<TableData[]> => {
  const apiUrl = `${API_BASE_URL}/${tableType}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${tableType}`);
    }

    const data: TableData[] = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
