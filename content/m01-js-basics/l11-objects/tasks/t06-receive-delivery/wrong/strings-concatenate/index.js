export function receiveDelivery(stock, lines) {
  const next = {};
  for (const sku of Object.keys(stock)) {
    next[sku] = stock[sku];
  }

  const added = [];
  for (const line of lines) {
    if (!Object.hasOwn(next, line.sku)) {
      next[line.sku] = 0;
      added.push(line.sku);
    }
    next[line.sku] = next[line.sku] + line.quantity;
  }

  return { stock: next, added };
}
