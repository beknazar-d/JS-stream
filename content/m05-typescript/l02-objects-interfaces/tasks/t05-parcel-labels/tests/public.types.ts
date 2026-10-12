import type { Summary } from './index.js';

type cases = [
  Expect<Equal<Summary, { count: number; totalWeightKg: number; fragileCount: number }>>,
];
