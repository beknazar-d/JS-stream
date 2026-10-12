import type { parseStock, lowStockCount, stockLabel } from './index.js';

type cases = [
  Expect<Equal<Parameters<typeof parseStock>, [string]>>,
  Expect<Equal<ReturnType<typeof parseStock>, number>>,
  Expect<Equal<Parameters<typeof lowStockCount>, [number[], number]>>,
  Expect<Equal<ReturnType<typeof lowStockCount>, number>>,
  Expect<Equal<Parameters<typeof stockLabel>, [string, number]>>,
  Expect<Equal<ReturnType<typeof stockLabel>, string>>,
];
