import { toRubles, orderTotal, freeShipping } from './index.js';

describe('Короткие расчёты', () => {
  it('toRubles переводит копейки в рубли', () => {
    expect(toRubles(1999), '1999 копеек').toBeCloseTo(19.99, 2);
    expect(toRubles(500), '500 копеек').toBe(5);
  });

  it('orderTotal умножает цену на количество', () => {
    expect(orderTotal(300, 4), '4 штуки по 300').toBe(1200);
  });

  it('freeShipping всегда возвращает ноль', () => {
    expect(freeShipping(), 'Бесплатная доставка').toBe(0);
  });
});
