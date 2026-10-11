export function countByStatus(orders) {
  const counts = {};
  for (const order of orders) {
    const status = order.status ?? 'unknown';
    if (status === 'new' || status === 'paid' || status === 'shipped' || status === 'unknown') {
      counts[status] = (counts[status] ?? 0) + 1;
    }
  }
  return counts;
}
