export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
}

export function paginate<T>(items: T[], page: number, size: number): Page<T> {
  const totalPages = Math.ceil(items.length / size);
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * size;
  return { items: items.slice(start, start + size), page: safePage, totalPages };
}
