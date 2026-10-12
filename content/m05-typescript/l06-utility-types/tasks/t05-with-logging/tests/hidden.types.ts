import { withLogging } from './index.js';

const noArgs = withLogging(() => 'ok', 'ping', () => {});
const optional = withLogging((id: number, note?: string) => `${id}${note ?? ''}`, 'note', () => {});
const rest = withLogging((...ids: number[]) => ids.length, 'count', () => {});

type cases = [
  Expect<Equal<typeof noArgs, () => string>>,
  Expect<Equal<typeof optional, (id: number, note?: string) => string>>,
  Expect<Equal<typeof rest, (...ids: number[]) => number>>,
];

optional(1);
optional(1, 'срочно');
rest();
rest(1, 2, 3);

// @ts-expect-error лишний аргумент
noArgs(1);

// @ts-expect-error журнал принимает функцию, а не строку
withLogging('calc', 'calc', () => {});
