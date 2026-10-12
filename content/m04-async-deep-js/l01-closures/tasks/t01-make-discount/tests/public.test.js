import { makeDiscount } from './index.js';

describe('makeDiscount: обычные скидки', () => {
  it('возвращает функцию', () => {
    expect(makeDiscount(10), 'Фабрика должна вернуть функцию').toBeTypeOf('function');
  });

  it('скидка 10% на 1000 рублей', () => {
    expect(makeDiscount(10)(1000), 'Купон -10% на цену 1000').toBe(900);
  });

  it('скидка 25% на 800 рублей', () => {
    expect(makeDiscount(25)(800), 'Купон -25% на цену 800').toBe(600);
  });
});
