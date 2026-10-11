export function sumPrices(prices) {
  return prices.reduce((sum, price) => sum + price, 0);
}

export function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function sortPricesAscending(prices) {
  return prices.toSorted((a, b) => a - b);
}
