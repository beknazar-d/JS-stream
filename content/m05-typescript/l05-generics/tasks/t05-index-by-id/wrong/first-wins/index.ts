export function findById<T extends { id: number }>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

export function indexById<T extends { id: number }>(items: T[]): Map<number, T> {
  const index = new Map<number, T>();
  for (const item of items) {
    if (!index.has(item.id)) {
      index.set(item.id, item);
    }
  }
  return index;
}
