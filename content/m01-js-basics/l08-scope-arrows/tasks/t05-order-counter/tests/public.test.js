import { createOrderCounter } from './index.js';

describe('createOrderCounter', () => {
  it('нумерация идёт по порядку, начиная со startFrom', () => {
    const next = createOrderCounter(1000);
    expect(next(), 'Первый заказ').toBe(1000);
    expect(next(), 'Второй заказ').toBe(1001);
    expect(next(), 'Третий заказ').toBe(1002);
  });

  it('по умолчанию нумерация начинается с 1', () => {
    const next = createOrderCounter();
    expect(next(), 'Первый номер по умолчанию').toBe(1);
    expect(next(), 'Второй номер по умолчанию').toBe(2);
  });
});
