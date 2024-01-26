// sortUtils.ts
interface SortOptions<T> {
  key: keyof T;
  order: 'asc' | 'desc';
}

export const sortData = <T>(data: T[], options: SortOptions<T>): T[] => {
  const { key, order } = options;

  return data.slice().sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (order === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return bValue > aValue ? 1 : -1;
    }
  });
};
