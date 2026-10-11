export const vat = (price) => price * 1.2;

export const lineTotal = (price, quantity) => price * quantity;

export function parcelKind(weightKg) {
  if (weightKg > 3) {
    return 'Тяжёлая';
  }
  return 'Обычная';
}

export function orderNumber(number) {
  return '№' + String(number).padStart(5, '0');
}

export const discounted = (price, percent = 0) => price - (price * percent) / 100;
