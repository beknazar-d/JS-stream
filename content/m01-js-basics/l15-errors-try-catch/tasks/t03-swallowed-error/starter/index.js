// Резерв товара на складе и оформление заказа.

export function reserve(stock, qty) {
  try {
    if (qty > stock) {
      throw new Error('Недостаточно товара на складе');
    }
    return stock - qty;
  } catch (error) {
    console.log(error.message);
  }
}

export function placeOrder(stock, qty) {
  const left = reserve(stock, qty);
  return { ok: true, left };
}
