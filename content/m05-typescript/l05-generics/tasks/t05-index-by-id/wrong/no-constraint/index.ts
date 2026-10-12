export function findById<T>(items: T[], id: number): T | undefined {
  return items.find((item) => (item as any).id === id);
}

export function indexById<T>(items: T[]): Map<number, T> {
  const index = new Map<number, T>();
  for (const item of items) {
    index.set((item as any).id, item);
  }
  return index;
}
