// PLAT-77: общее хранилище записей в памяти.
// Сейчас типы жёстко привязаны к числовому id — сделайте их обобщёнными.
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
  throw new Error('Не реализовано');
}
