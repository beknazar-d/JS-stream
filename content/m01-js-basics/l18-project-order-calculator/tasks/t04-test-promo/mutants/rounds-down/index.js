// Скидка по промокоду в копейках. Пустой промокод даёт 0.
export function applyPromo(amount, code) {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new Error('Сумма должна быть целым неотрицательным числом копеек');
  }
  const normalized = typeof code === 'string' ? code.trim().toUpperCase() : '';
  if (normalized === '') {
    return 0;
  }
  if (normalized === 'SALE10') {
    return Math.floor(amount / 10);
  }
  if (normalized === 'MINUS500') {
    if (amount < 200000) {
      throw new Error('Промокод MINUS500 действует от 2 000 ₽');
    }
    return 50000;
  }
  throw new Error(`Неизвестный промокод: ${code}`);
}
