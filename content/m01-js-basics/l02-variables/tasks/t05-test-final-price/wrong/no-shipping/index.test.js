import { finalPrice } from './index.js';

describe('finalPrice', () => {
  it('добавляет НДС', () => {
    expect(finalPrice(1000, 10, 0), 'Цена 1000, НДС 10').toBe(1100);
  });

  it('учитывает ставку из параметра', () => {
    expect(finalPrice(1000, 20, 0), 'Цена 1000, НДС 20').toBe(1200);
  });

  it('принимает цену строкой', () => {
    expect(finalPrice('1000', 10, 0), 'Цена "1000" строкой').toBe(1100);
  });
});
