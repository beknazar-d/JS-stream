export function reserve(stock, qty) {
  if (qty > stock) {
    throw new Error('Недостаточно товара на складе');
  }
  return stock - qty;
}

export function placeOrder(stock, qty) {
  try {
    return { ok: true, left: reserve(stock, qty) };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}
