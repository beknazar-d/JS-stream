export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function parseRow(row, findProduct) {
  const sku = row.sku.trim();
  if (sku === '') {
    throw new ValidationError('Не указан артикул');
  }

  const qty = Number(row.qty);
  if (!Number.isInteger(qty) || qty <= 0) {
    throw new ValidationError('Количество должно быть целым числом больше нуля');
  }

  const product = findProduct(sku);
  if (!product) {
    throw new ValidationError(`Неизвестный артикул: ${sku}`);
  }

  return { sku, qty, total: qty * product.price };
}

export function importRows(rows, findProduct) {
  const valid = [];
  const errors = [];

  rows.forEach((row, index) => {
    try {
      valid.push(parseRow(row, findProduct));
    } catch (error) {
      if (!(error instanceof ValidationError)) {
        throw error;
      }
      errors.push({ row: index + 1, message: error.message });
    }
  });

  return { valid, errors };
}
