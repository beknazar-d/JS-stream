export function buildReport(orders, limit) {
  const byStatus = orders.reduce((groups, order) => {
    const status = order.status ?? 'unknown';
    if (!Object.hasOwn(groups, status)) {
      groups[status] = { count: 0, total: 0 };
    }
    groups[status].count += 1;
    groups[status].total += order.total;
    return groups;
  }, {});

  const paid = orders.filter((order) => order.status === 'paid');
  const paidRevenue = paid.reduce((sum, order) => sum + order.total, 0);

  const top = paid
    .toSorted((a, b) => {
      const byTotal = b.total - a.total;
      if (byTotal !== 0) {
        return byTotal;
      }
      return a.id.localeCompare(b.id);
    })
    .slice(0, limit)
    .map((order) => order.id);

  return { byStatus, paidRevenue, top };
}
