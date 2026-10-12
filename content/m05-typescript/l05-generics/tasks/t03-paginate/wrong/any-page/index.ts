export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
}

export function paginate(items: any[], page: number, size: number): Page<any> {
  const totalPages = Math.ceil(items.length / size);
  const start = (page - 1) * size;
  return { items: items.slice(start, start + size), page, totalPages };
}
