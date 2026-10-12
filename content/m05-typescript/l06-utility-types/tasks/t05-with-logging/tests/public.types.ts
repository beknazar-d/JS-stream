import { withLogging } from './index.js';

function calcDeliveryFee(zone: string, weightKg: number): number {
  return weightKg;
}
async function loadRate(currency: 'USD' | 'EUR'): Promise<number> {
  return 1;
}

const logged = withLogging(calcDeliveryFee, 'calcDeliveryFee', () => {});
const asyncLogged = withLogging(loadRate, 'loadRate', () => {});

type cases = [
  Expect<Equal<typeof logged, (zone: string, weightKg: number) => number>>,
  Expect<Equal<typeof asyncLogged, (currency: 'USD' | 'EUR') => Promise<number>>>,
];

// @ts-expect-error не хватает второго аргумента
logged('north');

// @ts-expect-error вес должен быть числом
logged('north', '3');
