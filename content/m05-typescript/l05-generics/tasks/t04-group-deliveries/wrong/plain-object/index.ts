export function groupBy<T>(items: T[], keyOf: (item: T) => string): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  for (const item of items) {
    const key = keyOf(item);
    groups[key] ??= [];
    groups[key].push(item);
  }
  return groups;
}
