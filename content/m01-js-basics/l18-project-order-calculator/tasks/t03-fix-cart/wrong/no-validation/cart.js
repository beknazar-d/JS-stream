import { ValidationError } from './errors.js';

// Возвращает НОВУЮ корзину с добавленной позицией. Цена в копейках.
export function addItem(cart, item) {
  const { sku, name, price, qty } = item;
  const exists = cart.some((line) => line.sku === sku);
  if (exists) {
    return cart.map((line) => (line.sku === sku ? { ...line, qty: line.qty + qty } : line));
  }
  return [...cart, { sku, name, price, qty }];
}

// Сумма корзины в копейках, без скидок.
export function subtotal(cart) {
  return cart.reduce((sum, line) => sum + line.price * line.qty, 0);
}
