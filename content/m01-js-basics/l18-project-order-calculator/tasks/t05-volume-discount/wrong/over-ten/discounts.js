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

// Скидка за количество: 5% на позицию, если в ней 10 штук и больше.
export function volumeDiscount(cart) {
  return cart.reduce((sum, line) => {
    return line.qty > 10 ? sum + Math.round((line.price * line.qty * 5) / 100) : sum;
  }, 0);
}

// Промокод считается от суммы после скидки за количество.
export function discountSummary(cart, code) {
  const sum = subtotal(cart);
  const volume = volumeDiscount(cart);
  const afterVolume = sum - volume;
  const promo = applyPromo(afterVolume, code);
  return { subtotal: sum, volume, promo, total: afterVolume - promo };
}
