export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
}

export function paginate<T>(items: T[], page: number, size: number): Page<T> {
  const totalPages = Math.floor(items.length / size);
  const start = (page - 1) * size;
  return { items: items.slice(start, start + size), page, totalPages };
}
