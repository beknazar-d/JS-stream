export function vat(price) {
  return price * 1.2;
}

export function lineTotal(price, quantity) {
  return price * quantity;
}

export function parcelKind(weightKg) {
  if (weightKg > 3) {
    return 'Тяжёлая';
  }
  return 'Обычная';
}

export function orderNumber(number) {
  return '№' + String(number).padStart(5, '0');
}

export function discounted(price, percent = 0) {
  return price - (price * percent) / 100;
}
