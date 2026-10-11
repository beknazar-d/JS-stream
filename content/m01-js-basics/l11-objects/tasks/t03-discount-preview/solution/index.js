export function applyDiscount(order, percent) {
  return {
    id: order.id,
    status: order.status,
    total: Math.round(order.total * (100 - percent) / 100),
    customer: order.customer,
  };
}
