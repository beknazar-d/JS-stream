import { finalPrice } from './index.js';

describe('finalPrice', () => {
  it('добавляет НДС 20 процентов', () => {
    expect(finalPrice(1000, 20, 0), 'Цена 1000, НДС 20, доставки нет').toBe(1200);
  });

  it('считает для другой цены', () => {
    expect(finalPrice(500, 20, 0), 'Цена 500, НДС 20, доставки нет').toBe(600);
  });
});
