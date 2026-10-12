// PLAT-77: общее хранилище записей в памяти.
export interface Entity<Id = number> {
  id: Id;
}

export interface Repository<T extends Entity<Id>, Id = number> {
  add(item: T): void;
  get(id: Id): T | undefined;
  list(): T[];
  remove(id: Id): boolean;
}

export function createRepository<T extends Entity<Id>, Id = number>(): Repository<T, Id> {
  const items = new Map<Id, T>();
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
