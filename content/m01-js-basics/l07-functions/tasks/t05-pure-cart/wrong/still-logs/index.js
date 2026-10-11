export function addItem(total, price, quantity = 1) {
  const result = total + price * quantity;
  console.log(`В корзине: ${result} руб.`);
  return result;
}
