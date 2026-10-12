import { createRepository, type Entity } from './index.js';

interface Zone {
  id: number;
  title: string;
}

const zones = createRepository<Zone>();

type cases = [
  Expect<Equal<Entity, { id: number }>>,
  Expect<Equal<Entity<string>, { id: string }>>,
  Expect<Equal<Parameters<typeof zones.add>, [item: Zone]>>,
  Expect<Equal<ReturnType<typeof zones.remove>, boolean>>,
];

// @ts-expect-error в хранилище зон нельзя добавить запись другого вида
zones.add({ id: 1, name: 'Север' });

// @ts-expect-error тип без поля id не подходит под ограничение
createRepository<{ title: string }>();

// @ts-expect-error Id задан как string, а у записи id число
createRepository<Zone, string>();
