import type { Courier } from './index.js';

type cases = [
  Expect<Equal<Courier, { readonly id: number; name: string; phone?: string; vehicle: string }>>,
];
