export function applyCoupon(total, code) {
  if (typeof total !== 'number' || !Number.isFinite(total) || total < 0) {
    throw new Error('Сумма заказа должна быть неотрицательным числом');
  }
  if (code === 'SALE10') {
    return Math.round(total * 0.9);
  }
  if (code === 'MINUS500') {
    return total - 500;
  }
  throw new Error(`Неизвестный промокод: ${code}`);
}
