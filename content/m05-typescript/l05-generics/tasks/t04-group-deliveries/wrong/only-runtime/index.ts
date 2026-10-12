export function groupBy(items: any[], keyOf: (item: any) => string): Record<string, any[]> {
  const groups: Record<string, any[]> = {};
  for (const item of items) {
    const key = keyOf(item);
    if (!Object.hasOwn(groups, key)) {
      groups[key] = [];
    }
    groups[key].push(item);
  }
  return groups;
}
