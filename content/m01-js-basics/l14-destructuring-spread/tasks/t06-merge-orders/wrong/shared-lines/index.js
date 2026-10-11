export function mergeOrders(base, ...others) {
  const lines = [...base.lines];

  for (const order of others) {
    for (const line of order.lines) {
      const existing = lines.find((item) => item.sku === line.sku);
      if (existing) {
        existing.qty += line.qty;
      } else {
        lines.push({ ...line });
      }
    }
  }

  return { ...base, lines, mergedFrom: others.map((order) => order.id) };
}
