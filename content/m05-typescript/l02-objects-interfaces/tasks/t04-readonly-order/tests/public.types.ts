import type { Order } from './index.js';

type cases = [
  Expect<Equal<Order, { readonly id: number; readonly createdAt: string; readonly status: string; readonly total: number }>>,
];
