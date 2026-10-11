import { closingStock } from './index.js';

describe('closingStock', () => {
  it('считает остаток из чисел', () => {
    expect(closingStock(40, 10, 25, 3), 'Было 40, привезли 10, продали 25, списали 3').toBe(22);
  });

  it('считает остаток из строк формы', () => {
    const result = closingStock('40', '10', '25', '3');
    expect(result, 'Те же значения строками из формы').toBe(22);
    expect(result, 'Результат должен быть числом').toBeTypeOf('number');
  });

  it('пустой остаток после списания', () => {
    expect(closingStock(5, 0, 5, 0), 'Продали всё').toBe(0);
  });
});
