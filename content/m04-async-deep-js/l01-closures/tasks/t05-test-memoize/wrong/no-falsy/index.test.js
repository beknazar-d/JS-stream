import { memoize } from './index.js';

describe('memoize', () => {
  it('на один аргумент исходная функция вызывается один раз', () => {
    const calc = fn((zone) => zone * 150);
    const fast = memoize(calc);
    fast(2);
    fast(2);
    expect(calc, 'Два вызова с зоной 2').toHaveBeenCalledTimes(1);
  });

  it('помнит все аргументы', () => {
    const calc = fn((zone) => zone * 150);
    const fast = memoize(calc);
    fast(2);
    fast(3);
    fast(2);
    expect(calc, 'Порядок 2, 3, 2').toHaveBeenCalledTimes(2);
  });

  it('две функции не делят кэш', () => {
    const double = memoize((x) => x * 2);
    const triple = memoize((x) => x * 3);
    expect(double(2), 'double(2)').toBe(4);
    expect(triple(2), 'triple(2)').toBe(6);
  });
});
