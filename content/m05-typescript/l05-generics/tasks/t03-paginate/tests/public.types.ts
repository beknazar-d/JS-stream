import { paginate, type Page } from './index.js';

interface Order {
  id: number;
  city: string;
}

declare const orders: Order[];
declare const couriers: string[];

const orderPage = paginate(orders, 1, 10);
const courierPage = paginate(couriers, 1, 10);

type cases = [
  Expect<Equal<typeof orderPage, Page<Order>>>,
  Expect<Equal<typeof courierPage, Page<string>>>,
  Expect<Equal<(typeof orderPage)['items'][number], Order>>,
];
