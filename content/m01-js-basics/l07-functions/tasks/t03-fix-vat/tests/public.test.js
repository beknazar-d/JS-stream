import { withVat } from './index.js';

describe('withVat', () => {
  it('ставка по умолчанию 20%', () => {
    expect(withVat(100), 'Цена 100 без указания ставки').toBeCloseTo(120, 2);
  });

  it('своя ставка', () => {
    expect(withVat(100, 0.1), 'Цена 100 со ставкой 10%').toBeCloseTo(110, 2);
  });
});
