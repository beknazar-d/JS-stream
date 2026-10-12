export function parseStock(raw: string): number {
  return Number(raw);
}

export function lowStockCount(stocks: number[], limit: number): number {
  let count: number = 0;
  for (const stock of stocks) {
    if (stock < limit) {
      count = count + 1;
    }
  }
  return count;
}

export function stockLabel(name: string, left: number): string {
  return name + ": " + left.toUpperCase();
}
