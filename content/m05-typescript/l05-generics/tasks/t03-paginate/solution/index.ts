export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
}

// Тикет DEV-524: одна функция страниц для всех списков.
export function paginate<T>(items: T[], page: number, size: number): Page<T> {
  const totalPages = Math.ceil(items.length / size);
  const start = (page - 1) * size;
  return { items: items.slice(start, start + size), page, totalPages };
}
