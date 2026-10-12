export interface Entity<Id = number> {
  id: Id;
}

export interface Repository<T extends Entity<Id>, Id = number> {
  add(item: T): void;
  get(id: Id): T | undefined;
  list(): T[];
  remove(id: Id): boolean;
}

const items = new Map<unknown, unknown>();

export function createRepository<T extends Entity<Id>, Id = number>(): Repository<T, Id> {
  return {
    add(item) {
      items.set(item.id, item);
    },
    get(id) {
      return items.get(id) as T | undefined;
    },
    list() {
      return [...items.values()] as T[];
    },
    remove(id) {
      return items.delete(id);
    },
  };
}
