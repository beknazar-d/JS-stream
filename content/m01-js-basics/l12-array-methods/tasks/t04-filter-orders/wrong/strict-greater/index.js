export function filterOrders(orders, filters) {
  return orders.filter((order) => {
    const matchesStatus = filters.status === undefined || order.status === filters.status;
    const matchesTotal = filters.minTotal === undefined || order.total > filters.minTotal;
    const matchesQuery =
      filters.query === undefined ||
      order.customerName.toLowerCase().includes(filters.query.toLowerCase());
    return matchesStatus && matchesTotal && matchesQuery;
  });
}
