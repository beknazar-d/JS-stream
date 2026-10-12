let lines = [];

export function createCart() {
  return {
    add(sku, price, qty) {
      const existing = lines.find((line) => line.sku === sku);
      if (existing) {
        existing.qty = existing.qty + qty;
        return existing.qty;
      }
      lines.push({ sku, price, qty });
      return qty;
    },
    remove(sku) {
      const before = lines.length;
      lines = lines.filter((line) => line.sku !== sku);
      return lines.length < before;
    },
    items() {
      return lines.map((line) => ({ ...line }));
    },
    total() {
      return lines.reduce((sum, line) => sum + line.price * line.qty, 0);
    },
    count() {
      return lines.reduce((sum, line) => sum + line.qty, 0);
    },
  };
}
