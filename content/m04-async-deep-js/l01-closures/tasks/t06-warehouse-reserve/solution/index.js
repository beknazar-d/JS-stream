export function createWarehouse(initialStock) {
  const stock = { ...initialStock };
  const reservations = new Map();
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
      reservations.set(id, { sku, qty });
      return { ok: true, id };
    },
    release(id) {
      const reservation = reservations.get(id);
      if (!reservation) {
        return false;
      }
      stock[reservation.sku] = stock[reservation.sku] + reservation.qty;
      reservations.delete(id);
      return true;
    },
    snapshot() {
      return { ...stock };
    },
  };
}
