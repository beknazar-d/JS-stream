export function applyDiscount(order, percent) {
  return {
    id: order.id,
    total: Math.round(order.total * (100 - percent) / 100),
  };
}
