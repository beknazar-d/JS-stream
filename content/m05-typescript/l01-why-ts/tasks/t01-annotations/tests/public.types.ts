import type { orderId, customerName, isPaid, itemPrices, tags } from './index.js';

type cases = [
  Expect<Equal<typeof orderId, number>>,
  Expect<Equal<typeof customerName, string>>,
  Expect<Equal<typeof isPaid, boolean>>,
  Expect<Equal<typeof itemPrices, number[]>>,
  Expect<Equal<typeof tags, string[]>>,
];
