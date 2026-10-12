// BUG-3107: отчёт «Доставки по курьерам».
export function groupBy<T>(items: T[], keyOf: (item: T) => string): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  for (const item of items) {
    const key = keyOf(item);
    if (!Object.hasOwn(groups, key)) {
      groups[key] = [];
    }
    groups[key].push(item);
  }
  return groups;
}
