import type { zones, baseRates, zoneIndex, deliveryPrice, totalForOrders, receipt } from './index.js';

type cases = [
  Expect<Equal<typeof zones, string[]>>,
  Expect<Equal<typeof baseRates, number[]>>,
  Expect<Equal<Parameters<typeof zoneIndex>, [string]>>,
  Expect<Equal<ReturnType<typeof zoneIndex>, number>>,
  Expect<Equal<Parameters<typeof deliveryPrice>, [string, number, boolean]>>,
  Expect<Equal<ReturnType<typeof deliveryPrice>, number>>,
  Expect<Equal<Parameters<typeof totalForOrders>, [number[]]>>,
  Expect<Equal<ReturnType<typeof totalForOrders>, number>>,
  Expect<Equal<Parameters<typeof receipt>, [number, number[], string]>>,
  Expect<Equal<ReturnType<typeof receipt>, string>>,
];
