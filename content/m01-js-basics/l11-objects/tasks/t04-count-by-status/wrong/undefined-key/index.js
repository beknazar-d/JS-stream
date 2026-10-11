export function countByStatus(orders) {
  const counts = {};
  for (const order of orders) {
    const status = order.status;
    counts[status] = (counts[status] ?? 0) + 1;
  }
  return counts;
}
