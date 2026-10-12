import { firstItem } from './index.js';

declare const flags: boolean[];
declare const pairs: [string, number][];
declare const parcels: { id: number; weightKg: number }[];

const firstFlag = firstItem(flags);
const firstPair = firstItem(pairs);
const firstParcel = firstItem(parcels);

type cases = [
  Expect<Equal<typeof firstFlag, boolean | undefined>>,
  Expect<Equal<typeof firstPair, [string, number] | undefined>>,
  Expect<Equal<typeof firstParcel, { id: number; weightKg: number } | undefined>>,
  // Тип результата не any:
  ExpectFalse<Equal<typeof firstFlag, any>>,
];
