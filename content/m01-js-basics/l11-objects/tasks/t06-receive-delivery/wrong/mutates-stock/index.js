export function receiveDelivery(stock, lines) {
  const added = [];
  for (const line of lines) {
    const quantity = Number(line.quantity);
    if (!Number.isInteger(quantity) || quantity < 1) {
      continue;
    }
    if (!Object.hasOwn(stock, line.sku)) {
      stock[line.sku] = 0;
      added.push(line.sku);
    }
    stock[line.sku] = stock[line.sku] + quantity;
  }

  return { stock, added };
}
