import { ValidationError } from './errors.js';

// Переводит текст из формы («1200.50», «1200,5», «99») в целые копейки.
export function toKopecks(text) {
  const normalized = String(text).trim();
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    throw new ValidationError(`Сумма указана неверно: «${text}»`);
  }
  const [rubles, kopecks = ''] = normalized.split('.');
  return Number(rubles) * 100 + Number(kopecks.padEnd(2, '0'));
}

// Показывает копейки как «1 200,50 ₽» (обычный пробел между разрядами).
export function formatMoney(kopecks) {
  if (!Number.isInteger(kopecks) || kopecks < 0) {
    throw new ValidationError('Сумма должна быть целым неотрицательным числом копеек');
  }
  const rubles = String(Math.floor(kopecks / 100));
  const cents = String(kopecks % 100).padStart(2, '0');

  let grouped = '';
  for (let i = 0; i < rubles.length; i++) {
    const fromEnd = rubles.length - i;
    grouped += rubles[i];
    if (fromEnd > 1 && fromEnd % 3 === 1) {
      grouped += ' ';
    }
  }
  return `${grouped},${cents} ₽`;
}
