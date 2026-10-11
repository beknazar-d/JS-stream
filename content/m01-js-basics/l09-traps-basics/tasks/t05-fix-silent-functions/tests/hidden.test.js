import { lineTotal, withShipping, stockLabel } from './index.js';

describe('lineTotal: границы', () => {
  it('возвращает число, а не undefined', () => {
    expect(lineTotal(250, 2), 'Тип результата').toBeTypeOf('number');
    expect(lineTotal(250, 0), 'Ноль штук').toBe(0);
  });
});

describe('withShipping: доставка', () => {
  it('нулевая доставка остаётся нулём', () => {
    expect(withShipping(1000, 0), 'Явный ноль вместо доставки').toBe(1000);
  });

  it('своя стоимость доставки', () => {
    expect(withShipping(1000, 500), 'Доставка 500').toBe(1500);
  });

  it('значение undefined означает «не указана»', () => {
    expect(withShipping(2000, undefined), 'Явный undefined').toBe(2350);
  });
});

describe('stockLabel: подпись', () => {
  it('нулевой остаток', () => {
    expect(stockLabel(0), 'Остаток 0').toBe('Остаток: 0 шт.');
  });

  it('большой остаток', () => {
    expect(stockLabel(1200), 'Остаток 1200').toBe('Остаток: 1200 шт.');
  });

  it('в подписи нет слова undefined', () => {
    expect(stockLabel(7).includes('undefined'), 'Слово undefined в подписи').toBe(false);
  });
});
