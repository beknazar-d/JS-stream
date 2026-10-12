import type { averageMinutes, countPaid, formatPrice } from './index.js';

type cases = [
  Expect<Equal<Parameters<typeof averageMinutes>, [number[]]>>,
  Expect<Equal<ReturnType<typeof averageMinutes>, number>>,
  Expect<Equal<Parameters<typeof countPaid>, [boolean[]]>>,
  Expect<Equal<ReturnType<typeof countPaid>, number>>,
  Expect<Equal<Parameters<typeof formatPrice>, [number, string]>>,
  Expect<Equal<ReturnType<typeof formatPrice>, string>>,
];
