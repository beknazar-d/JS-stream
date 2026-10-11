// Корзина: массив позиций { sku, name, price, qty }. Цена в копейках.

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
  let sum = 0;
  for (const line of cart) {
    sum += (line.price * line.qty) / 100;
  }
  return sum;
}
