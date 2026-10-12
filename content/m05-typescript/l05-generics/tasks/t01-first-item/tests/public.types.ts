import { firstItem } from './index.js';

interface Order {
  id: number;
  city: string;
}

declare const orders: Order[];
declare const couriers: string[];

const firstOrder = firstItem(orders);
const firstCourier = firstItem(couriers);

type cases = [
  Expect<Equal<typeof firstOrder, Order | undefined>>,
  Expect<Equal<typeof firstCourier, string | undefined>>,
];
