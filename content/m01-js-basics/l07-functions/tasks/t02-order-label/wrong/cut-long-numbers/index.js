export function orderLabel(number) {
  return `Заказ №${('000' + number).slice(-4)}`;
}
