import { readWeight } from './index.js';

type cases = [
  Expect<Equal<Parameters<typeof readWeight>[0], unknown>>,
  Expect<Equal<ReturnType<typeof readWeight>, number>>,
];

// Функцию можно вызывать с любым значением.
readWeight(2.5);
readWeight("2.5");
readWeight(null);
readWeight({ weight: 1 });
