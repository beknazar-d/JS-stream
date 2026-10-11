export function applyDiscount(order, percent) {
  return {
    id: order.id,
    status: order.status,
    total: Math.round(order.total * percent / 100),
    customer: order.customer,
  };
}
