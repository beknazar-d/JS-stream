export function isEvenOrder(orderNumber) {
  return orderNumber % 2 === 0;
}

export function boxVolume(side) {
  return side ** 3;
}

export function restock(stock, delivered) {
  let total = stock;
  total += delivered;
  return total;
}
