import { groupBy } from './index.js';

interface Delivery {
  id: number;
  courier: string;
  address: string;
}

declare const deliveries: Delivery[];

const byCourier = groupBy(deliveries, (delivery) => delivery.courier);

type cases = [
  Expect<Equal<typeof byCourier, Record<string, Delivery[]>>>,
];

// @ts-expect-error опечатка в названии поля должна быть видна компилятору
byCourier['Анна'][0].adress;
