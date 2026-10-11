export function available(stock, sku) {
  return stock[sku] ?? 0;
}

export function canReserve(stock, sku, qty) {
  return qty <= available(stock, sku);
}
