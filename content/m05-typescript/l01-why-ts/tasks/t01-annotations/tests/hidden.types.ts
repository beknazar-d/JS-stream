import { describeParcel } from './index.js';

type cases = [
  Expect<Equal<Parameters<typeof describeParcel>, [number, number]>>,
  Expect<Equal<ReturnType<typeof describeParcel>, string>>,
];

// @ts-expect-error номер посылки — число, строку передавать нельзя
describeParcel("7", 2);

// @ts-expect-error вес — число
describeParcel(7, "2.5");
