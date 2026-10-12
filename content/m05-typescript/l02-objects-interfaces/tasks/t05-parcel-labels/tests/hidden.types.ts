import type { Parcel, Summary } from './index.js';
import { summarize, formatLabel } from './index.js';

const ok: Summary = { count: 0, totalWeightKg: 0, fragileCount: 0 };

// @ts-expect-error в сводке нужны все три поля
const partial: Summary = { count: 0 };

// @ts-expect-error summarize принимает массив посылок
summarize({ id: 1 });

// @ts-expect-error formatLabel принимает одну посылку, а не массив
formatLabel([]);

type cases = [
  Expect<Equal<ReturnType<typeof summarize>, Summary>>,
  Expect<Equal<ReturnType<typeof formatLabel>, string>>,
  Expect<Equal<Parameters<typeof formatLabel>, [Parcel]>>,
];
