export function reserve(stock, qty) {
  if (qty > stock) {
    throw new Error('Недостаточно товара на складе');
  }
  return stock - qty;
}

export function placeOrder(stock, qty) {
  const left = reserve(stock, qty);
  return { ok: true, left };
}
