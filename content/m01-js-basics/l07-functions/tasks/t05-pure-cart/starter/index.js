let total = 0;

export function addItem(price, quantity) {
  total = total + price * quantity;
  console.log(`В корзине: ${total} руб.`);
}

export function getTotal() {
  return total;
}
