import { parseQuantity } from './index.js';

describe('parseQuantity: обычный ввод', () => {
  it('разбирает целое число из строки', () => {
    expect(parseQuantity('3'), 'Поле "3"').toBe(3);
  });

  it('отбрасывает пробелы по краям', () => {
    expect(parseQuantity('  12 '), 'Поле "  12 " с пробелами').toBe(12);
  });

  it('текст даёт null', () => {
    expect(parseQuantity('abc'), 'Поле "abc"').toBeNull();
  });

  it('пустое поле даёт null', () => {
    expect(parseQuantity(''), 'Пустое поле').toBeNull();
  });
});
