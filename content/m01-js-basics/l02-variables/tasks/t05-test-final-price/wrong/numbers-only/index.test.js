import { finalPrice } from './index.js';

describe('finalPrice', () => {
  it('добавляет НДС', () => {
    expect(finalPrice(1000, 10, 0), 'Цена 1000, НДС 10').toBe(1100);
  });

  it('учитывает ставку из параметра', () => {
    expect(finalPrice(1000, 20, 0), 'Цена 1000, НДС 20').toBe(1200);
  });

  it('прибавляет доставку', () => {
    expect(finalPrice(1000, 10, 350), 'Цена 1000, НДС 10, доставка 350').toBe(1450);
  });
});
