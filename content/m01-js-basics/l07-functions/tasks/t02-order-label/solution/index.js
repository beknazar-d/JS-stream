export function orderLabel(number) {
  return `Заказ №${String(number).padStart(4, '0')}`;
}
