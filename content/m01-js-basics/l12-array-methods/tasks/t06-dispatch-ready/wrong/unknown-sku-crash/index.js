function lineIsAvailable(line, stock) {
  const item = stock.find((entry) => entry.sku === line.sku);
  return item.quantity >= line.quantity;
}

export function planDispatch(orders, stock) {
  const paidOrders = orders.filter((order) => order.status === 'paid');

  const ready = paidOrders
    .filter((order) => order.lines.every((line) => lineIsAvailable(line, stock)))
    .map((order) => order.id);

  const blocked = paidOrders
    .filter((order) => !order.lines.every((line) => lineIsAvailable(line, stock)))
    .map((order) => ({
      id: order.id,
      missing: order.lines.filter((line) => !lineIsAvailable(line, stock)).map((line) => line.sku),
    }));

  return { ready, blocked };
}
