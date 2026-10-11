function lineIsAvailable(line, stock) {
  const item = stock.find((entry) => entry.sku === line.sku);
  return item !== undefined && item.quantity >= line.quantity;
}

export function planDispatch(orders, stock) {
  const ready = orders
    .filter((order) => order.lines.every((line) => lineIsAvailable(line, stock)))
    .map((order) => order.id);

  const blocked = orders
    .filter((order) => !order.lines.every((line) => lineIsAvailable(line, stock)))
    .map((order) => ({
      id: order.id,
      missing: order.lines.filter((line) => !lineIsAvailable(line, stock)).map((line) => line.sku),
    }));

  return { ready, blocked };
}
