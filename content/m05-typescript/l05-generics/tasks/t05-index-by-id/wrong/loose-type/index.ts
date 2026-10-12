export function findById(items: { id: number }[], id: number): { id: number } | undefined {
  return items.find((item) => item.id === id);
}

export function indexById(items: { id: number }[]): Map<number, { id: number }> {
  const index = new Map<number, { id: number }>();
  for (const item of items) {
    index.set(item.id, item);
  }
  return index;
}
