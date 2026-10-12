import { groupBy } from './index.js';

declare const words: string[];
declare const parcels: { id: number; zone: 'north' | 'south' }[];

const byLength = groupBy(words, (word) => String(word.length));
const byZone = groupBy(parcels, (parcel) => parcel.zone);

type cases = [
  Expect<Equal<typeof byLength, Record<string, string[]>>>,
  Expect<Equal<typeof byZone, Record<string, { id: number; zone: 'north' | 'south' }[]>>>,
];

// @ts-expect-error ключ группы должен быть строкой
groupBy(parcels, (parcel) => parcel.id);
