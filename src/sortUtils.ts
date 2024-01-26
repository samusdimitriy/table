// sortUtils.ts
export interface SortOptions<T> {
  key: keyof T | null;
  order: 'asc' | 'desc';
}

export const sortData = <T>(data: T[], options: SortOptions<T>): T[] => {
  const { key, order } = options;

  return data.slice().sort((a, b) => {
    const aValue = key !== null ? (a[key] as T[keyof T]) : null;
    const bValue = key !== null ? (b[key] as T[keyof T]) : null;

    if (
      aValue !== null &&
      bValue !== null &&
      aValue !== undefined &&
      bValue !== undefined
    ) {
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return bValue > aValue ? 1 : -1;
      }
    }

    // Handle cases where aValue or bValue is null or undefined
    // You can decide the logic for handling null or undefined values here
    // For example, you might want to place null or undefined values at the end or the beginning
    // Alternatively, you can assign a default value for null or undefined, like 0 or an empty string

    return 0; // Adjust this line based on your specific requirements
  });
};
