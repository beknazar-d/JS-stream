export function createCart() {
  let lines = [];

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
      let sum = 0;
      for (const line of lines) {
        sum = sum + line.price * line.qty;
      }
      return sum;
    },
    count() {
      let sum = 0;
      for (const line of lines) {
        sum = sum + line.qty;
      }
      return sum;
    },
  };
}
