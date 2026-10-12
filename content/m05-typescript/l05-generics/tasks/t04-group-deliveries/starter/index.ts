// BUG-3107: отчёт «Доставки по курьерам».
export function groupBy(items: any[], keyOf: (item: any) => string): Record<string, any[]> {
  const groups: Record<string, any[]> = {};
  for (const item of items) {
    const key = keyOf(item);
    groups[key] = [item];
  }
  return groups;
}
