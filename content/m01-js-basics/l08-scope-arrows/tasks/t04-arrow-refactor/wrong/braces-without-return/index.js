export const vat = (price) => price * 1.2;

export const lineTotal = (price, quantity) => {
  price * quantity;
};

export const parcelKind = (weightKg) => (weightKg > 3 ? 'Тяжёлая' : 'Обычная');

export const orderNumber = (number) => '№' + String(number).padStart(5, '0');

export const discounted = (price, percent = 0) => price - (price * percent) / 100;
