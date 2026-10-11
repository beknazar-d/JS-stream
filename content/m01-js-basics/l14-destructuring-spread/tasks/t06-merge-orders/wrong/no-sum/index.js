export function mergeOrders(base, ...others) {
  const lines = base.lines.map((line) => ({ ...line }));

  for (const order of others) {
    for (const line of order.lines) {
      lines.push({ ...line });
    }
  }

  return { ...base, lines, mergedFrom: others.map((order) => order.id) };
}
