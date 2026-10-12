import { memoize } from './index.js';

describe('memoize: повторные вызовы', () => {
  it('на один аргумент исходная функция вызывается один раз', () => {
    const calc = fn((zone) => zone * 150);
    const fast = memoize(calc);
    fast(2);
    fast(2);
    fast(2);
    expect(calc, 'Три вызова с зоной 2').toHaveBeenCalledTimes(1);
  });

  it('возвращает один и тот же результат', () => {
    const fast = memoize((zone) => zone * 150);
    expect(fast(2), 'Первый вызов').toBe(300);
    expect(fast(2), 'Второй вызов из кэша').toBe(300);
  });

  it('передаёт аргумент в исходную функцию', () => {
    const calc = fn((zone) => zone * 150);
    memoize(calc)(4);
    expect(calc, 'Аргумент исходной функции').toHaveBeenCalledWith(4);
  });
});

describe('memoize: разные аргументы', () => {
  it('разные аргументы считаются отдельно', () => {
    const fast = memoize((zone) => zone * 150);
    expect(fast(2), 'Зона 2').toBe(300);
    expect(fast(3), 'Зона 3').toBe(450);
  });

  it('помнит все аргументы, а не только последний', () => {
    const calc = fn((zone) => zone * 150);
    const fast = memoize(calc);
    fast(2);
    fast(3);
    fast(2);
    expect(calc, 'Порядок 2, 3, 2: второй раз зона 2 берётся из кэша').toHaveBeenCalledTimes(2);
  });
});

describe('memoize: ложные результаты', () => {
  it('результат 0 тоже кэшируется', () => {
    const calc = fn(() => 0);
    const fast = memoize(calc);
    fast('free-zone');
    fast('free-zone');
    expect(calc, 'Бесплатная доставка равна нулю').toHaveBeenCalledTimes(1);
  });

  it('пустая строка и undefined тоже кэшируются', () => {
    const empty = fn(() => '');
    const nothing = fn(() => undefined);
    const fastEmpty = memoize(empty);
    const fastNothing = memoize(nothing);
    fastEmpty(1);
    fastEmpty(1);
    fastNothing(1);
    fastNothing(1);
    expect(empty, 'Результат — пустая строка').toHaveBeenCalledTimes(1);
    expect(nothing, 'Результат — undefined').toHaveBeenCalledTimes(1);
  });
});

describe('memoize: независимые кэши', () => {
  it('две мемоизированные функции не делят результаты', () => {
    const double = memoize((x) => x * 2);
    const triple = memoize((x) => x * 3);
    expect(double(2), 'double(2)').toBe(4);
    expect(triple(2), 'triple(2) не должна вернуть результат double').toBe(6);
  });
});
