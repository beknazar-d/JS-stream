export function addItem(cart, item) {
  const existing = cart.find((line) => line.sku === item.sku);
  if (existing) {
    existing.qty += item.qty;
    return cart;
  }
  cart.push(item);
  return cart;
}

export function subtotal(cart) {
  return cart.reduce((sum, line) => sum + line.price * line.qty, 0);
}
