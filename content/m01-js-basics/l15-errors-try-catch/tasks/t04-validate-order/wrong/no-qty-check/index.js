export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function validateOrder(order) {
  if (!order) {
    throw new ValidationError('Заказ не передан');
  }
  if (!Array.isArray(order.lines) || order.lines.length === 0) {
    throw new ValidationError('В заказе нет позиций');
  }
  for (const line of order.lines) {
    if (!Number.isFinite(line.price) || line.price < 0) {
      throw new ValidationError(`Позиция ${line.sku}: цена должна быть неотрицательным числом`);
    }
  }
  return order;
}
