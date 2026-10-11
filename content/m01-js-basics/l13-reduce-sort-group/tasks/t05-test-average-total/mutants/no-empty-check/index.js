export function averagePaidTotal(orders) {
  const paid = orders.filter((order) => order.status === 'paid');
  const sum = paid.reduce((total, order) => total + order.total, 0);
  return Math.round(sum / paid.length);
}
