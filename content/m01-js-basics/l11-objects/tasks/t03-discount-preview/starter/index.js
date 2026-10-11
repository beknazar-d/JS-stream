export function applyDiscount(order, percent) {
  const discounted = order;
  discounted.total = Math.round(order.total * (100 - percent) / 100);
  return discounted;
}
