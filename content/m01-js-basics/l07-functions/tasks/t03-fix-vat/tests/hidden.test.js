import { withVat } from './index.js';

describe('withVat: граничные ставки', () => {
  it('нулевая ставка не меняет цену', () => {
    expect(withVat(100, 0), 'Ставка 0').toBe(100);
    expect(withVat(2499, 0), 'Ставка 0 для другой цены').toBe(2499);
  });

  it('ставка undefined означает «не передана»', () => {
    expect(withVat(500, undefined), 'Явно переданный undefined').toBeCloseTo(600, 2);
  });
});

describe('withVat: тип результата', () => {
  it('возвращает число', () => {
    expect(withVat(100), 'Тип результата').toBeTypeOf('number');
    expect(Number.isNaN(withVat(100)), 'Результат не NaN').toBe(false);
  });
});
