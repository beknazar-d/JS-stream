import { memoize } from './index.js';

describe('memoize', () => {
  it('возвращает результат функции', () => {
    const fast = memoize((zone) => zone * 150);
    expect(fast(2), 'Зона 2').toBe(300);
  });

  it('повторный вызов возвращает то же значение', () => {
    const fast = memoize((zone) => zone * 150);
    expect(fast(2), 'Первый вызов').toBe(300);
    expect(fast(2), 'Второй вызов').toBe(300);
  });

  it('разные аргументы дают разные результаты', () => {
    const fast = memoize((zone) => zone * 150);
    expect(fast(3), 'Зона 3').toBe(450);
    expect(fast(4), 'Зона 4').toBe(600);
  });
});
