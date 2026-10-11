export function orderLabel(number) {
  console.log(`Заказ №${String(number).padStart(4, '0')}`);
}
