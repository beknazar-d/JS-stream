export function createWarehouse(initialStock) {
  const stock = { ...initialStock };
  let nextId = 1;

  return {
    available(sku) {
      return stock[sku] ?? 0;
    },
    reserve(sku, qty) {
      if (!Number.isInteger(qty) || qty < 1) {
        return { ok: false, reason: 'bad-quantity' };
      }
      if (!(sku in stock)) {
        return { ok: false, reason: 'unknown-sku' };
      }
      if (stock[sku] < qty) {
        return { ok: false, reason: 'not-enough' };
      }
      stock[sku] = stock[sku] - qty;
      const id = 'R-' + nextId;
      nextId = nextId + 1;
      return { ok: true, id };
    },
    snapshot() {
      return { ...stock };
    },
  };
}
