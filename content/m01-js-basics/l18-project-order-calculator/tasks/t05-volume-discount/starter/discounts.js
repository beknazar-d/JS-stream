import { ValidationError } from './errors.js';
import { subtotal } from './cart.js';

const MINUS500_FROM = 200000;

// Скидка по промокоду в копейках. Пустой промокод даёт 0.
export function applyPromo(amount, code) {
  if (!Number.isInteger(amount) || amount < 0) {
    throw new ValidationError('Сумма должна быть целым неотрицательным числом копеек');
  }
  const normalized = typeof code === 'string' ? code.trim().toUpperCase() : '';
  if (normalized === '') {
    return 0;
  }
  if (normalized === 'SALE10') {
    return Math.round(amount / 10);
  }
  if (normalized === 'MINUS500') {
    if (amount < MINUS500_FROM) {
      throw new ValidationError('Промокод MINUS500 действует от 2 000 ₽');
    }
    return 50000;
  }
  throw new ValidationError(`Неизвестный промокод: ${code}`);
}

// Версия 1: промокод считается от суммы корзины.
export function discountSummary(cart, code) {
  const sum = subtotal(cart);
  const promo = applyPromo(sum, code);
  return { subtotal: sum, promo, total: sum - promo };
}
