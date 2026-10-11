export function applyDiscount(order, percent) {
  if (percent === 0) {
    return order;
  }
  return {
    id: order.id,
    status: order.status,
    total: Math.round(order.total * (100 - percent) / 100),
    customer: order.customer,
  };
}
