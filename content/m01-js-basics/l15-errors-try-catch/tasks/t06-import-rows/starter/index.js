// Импорт строк заказа из партнёрской выгрузки.

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Превращает одну строку выгрузки в позицию или выбрасывает ValidationError.
export function parseRow(row, findProduct) {
}

// Разбирает все строки. Возвращает { valid, errors }.
export function importRows(rows, findProduct) {
}
