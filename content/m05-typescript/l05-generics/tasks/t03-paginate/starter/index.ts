export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
}

// Тикет DEV-524: одна функция страниц для всех списков.
export function paginate(items: unknown[], page: number, size: number): Page<unknown> {
  throw new Error('Не реализовано');
}
