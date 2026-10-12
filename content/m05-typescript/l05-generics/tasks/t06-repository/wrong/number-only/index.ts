export interface Entity {
  id: number;
}

export interface Repository<T extends Entity> {
  add(item: T): void;
  get(id: number): T | undefined;
  list(): T[];
  remove(id: number): boolean;
}

export function createRepository<T extends Entity>(): Repository<T> {
  const items = new Map<number, T>();
  return {
    add(item) {
      items.set(item.id, item);
    },
    get(id) {
      return items.get(id);
    },
    list() {
      return [...items.values()];
    },
    remove(id) {
      return items.delete(id);
    },
  };
}
