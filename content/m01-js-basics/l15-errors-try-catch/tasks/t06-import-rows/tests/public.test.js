import { parseRow, importRows } from './index.js';

const catalog = { 'A-100': { sku: 'A-100', price: 1200 }, 'B-200': { sku: 'B-200', price: 300 } };
const findProduct = (sku) => catalog[sku];

describe('parseRow', () => {
  it('разбирает хорошую строку', () => {
    expect(parseRow({ sku: 'A-100', qty: '3' }, findProduct), 'Строка A-100 × 3').toEqual({ sku: 'A-100', qty: 3, total: 3600 });
  });

  it('отклоняет неизвестный артикул', () => {
    expect(() => parseRow({ sku: 'Z-9', qty: '1' }, findProduct), 'Артикул Z-9').toThrow('Неизвестный артикул: Z-9');
  });

  it('отклоняет плохое количество', () => {
    expect(() => parseRow({ sku: 'A-100', qty: 'abc' }, findProduct), 'Количество «abc»').toThrow('Количество должно быть целым числом больше нуля');
  });
});

describe('importRows', () => {
  it('разбирает все строки и собирает отчёт', () => {
    const rows = [
      { sku: 'A-100', qty: '2' },
      { sku: 'Z-9', qty: '1' },
      { sku: 'B-200', qty: '5' },
    ];
    expect(importRows(rows, findProduct), 'Три строки, средняя плохая').toEqual({
      valid: [
        { sku: 'A-100', qty: 2, total: 2400 },
        { sku: 'B-200', qty: 5, total: 1500 },
      ],
      errors: [{ row: 2, message: 'Неизвестный артикул: Z-9' }],
    });
  });
});
