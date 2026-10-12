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
    fast(5);
    fast(6);
    fast(5);
    expect(calc, 'Порядок 5, 6, 5').toHaveBeenCalledTimes(2);
  });

  it('результат 0 тоже кэшируется', () => {
    const calc = fn(() => 0);
    const fast = memoize(calc);
    fast(11);
    fast(11);
    expect(calc, 'Нулевой результат').toHaveBeenCalledTimes(1);
  });
});
