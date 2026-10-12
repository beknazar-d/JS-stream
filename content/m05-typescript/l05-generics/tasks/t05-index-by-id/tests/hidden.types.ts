import { findById, indexById } from './index.js';

declare const suppliers: { id: number; title: string }[];
declare const noIds: { name: string }[];

const supplier = findById(suppliers, 1);
const suppliersIndex = indexById(suppliers);

type cases = [
  Expect<Equal<typeof supplier, { id: number; title: string } | undefined>>,
  Expect<Equal<typeof suppliersIndex, Map<number, { id: number; title: string }>>>,
];

// @ts-expect-error у записей нет поля id
findById(noIds, 1);

// @ts-expect-error у записей нет поля id
indexById(noIds);

// @ts-expect-error id должен быть числом, а не строкой
indexById([{ id: 'A-1' }]);
