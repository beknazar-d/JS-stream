export function createWarehouse(initialStock) {
  return {
    available(sku) {},
    reserve(sku, qty) {},
    release(id) {},
    snapshot() {},
  };
}
