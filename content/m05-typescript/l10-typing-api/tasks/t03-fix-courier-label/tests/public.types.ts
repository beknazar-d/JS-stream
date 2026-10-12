import { courierLabel, isCourier, type Courier } from './index.js';

// Охранник типа должен сужать unknown до Courier.
function narrow(value: unknown): Courier | null {
  return isCourier(value) ? value : null;
}

type cases = [
  Expect<Equal<ReturnType<typeof courierLabel>, string>>,
  Expect<Equal<Parameters<typeof courierLabel>, [json: string]>>,
  Expect<Equal<typeof isCourier, (value: unknown) => value is Courier>>,
];
