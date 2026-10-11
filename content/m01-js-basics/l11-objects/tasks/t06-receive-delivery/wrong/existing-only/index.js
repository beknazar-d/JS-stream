export function receiveDelivery(stock, lines) {
  const next = {};
  for (const sku of Object.keys(stock)) {
    next[sku] = stock[sku];
  }

  const added = [];
  for (const line of lines) {
    const quantity = Number(line.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
      continue;
    }
    if (Object.hasOwn(next, line.sku)) {
      next[line.sku] = next[line.sku] + quantity;
    }
  }

  return { stock: next, added };
}
