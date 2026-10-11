import { toKopecks, formatMoney } from './money.js';
import { ValidationError } from './errors.js';

describe('toKopecks', () => {
  it('рубли и копейки через точку', () => {
    expect(toKopecks('1200.50'), 'Строка «1200.50»').toBe(120050);
  });

  it('целые рубли', () => {
    expect(toKopecks('99'), 'Строка «99»').toBe(9900);
  });

  it('мусор вместо суммы', () => {
    expect(() => toKopecks('abc'), 'Строка «abc»').toThrow(ValidationError);
    expect(() => toKopecks('abc'), 'Текст ошибки').toThrow('Сумма указана неверно: «abc»');
  });
});

describe('formatMoney', () => {
  it('тысячи и копейки', () => {
    expect(formatMoney(120050), '120050 копеек').toBe('1 200,50 ₽');
  });

  it('нулевая сумма', () => {
    expect(formatMoney(0), '0 копеек').toBe('0,00 ₽');
  });
});
