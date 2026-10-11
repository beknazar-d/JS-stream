export function averagePaidTotal(orders) {
  const paid = orders.filter((order) => order.status === 'paid');
  if (paid.length === 0) {
    return 0;
  }
  const sum = paid.reduce((total, order) => total + order.total, 0);
  return Math.round(sum / paid.length);
}
