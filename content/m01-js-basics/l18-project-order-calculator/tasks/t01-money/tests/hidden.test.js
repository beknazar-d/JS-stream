import { toKopecks, formatMoney } from './money.js';
import { ValidationError } from './errors.js';

describe('toKopecks: форматы ввода', () => {
  it('запятая вместо точки', () => {
    expect(toKopecks('1200,5'), 'Строка «1200,5»').toBe(120050);
  });

  it('одна цифра копеек — это десятки копеек', () => {
    expect(toKopecks('1200.5'), 'Строка «1200.5»').toBe(120050);
    expect(toKopecks('0.7'), 'Строка «0.7»').toBe(70);
  });

  it('малые суммы', () => {
    expect(toKopecks('0.07'), 'Строка «0.07»').toBe(7);
    expect(toKopecks('0'), 'Строка «0»').toBe(0);
  });

  it('пробелы по краям', () => {
    expect(toKopecks(' 10 '), 'Строка « 10 »').toBe(1000);
  });

  it('число вместо строки', () => {
    expect(toKopecks(99), 'Число 99').toBe(9900);
  });

  it('значение 19.99 переводится точно', () => {
    expect(toKopecks('19.99'), 'Строка «19.99»').toBe(1999);
  });
});

describe('toKopecks: плохой ввод', () => {
  for (const text of ['', 'abc', '1.234', '-5', '1 200', '1,2,3', '.5', '5.']) {
    it(`отклоняет «${text}»`, () => {
      expect(() => toKopecks(text), `Строка «${text}»`).toThrow(`Сумма указана неверно: «${text}»`);
    });
  }
});

describe('formatMoney', () => {
  it('копейки меньше десяти', () => {
    expect(formatMoney(7), '7 копеек').toBe('0,07 ₽');
    expect(formatMoney(105), '105 копеек').toBe('1,05 ₽');
  });

  it('группы по три цифры', () => {
    expect(formatMoney(99999), '99999 копеек').toBe('999,99 ₽');
    expect(formatMoney(100000), '100000 копеек').toBe('1 000,00 ₽');
    expect(formatMoney(100000000), '100000000 копеек').toBe('1 000 000,00 ₽');
    expect(formatMoney(123456789), '123456789 копеек').toBe('1 234 567,89 ₽');
  });

  it('плохие суммы', () => {
    const message = 'Сумма должна быть целым неотрицательным числом копеек';
    expect(() => formatMoney(-1), 'Минус').toThrow(message);
    expect(() => formatMoney(1.5), 'Дробь').toThrow(message);
    expect(() => formatMoney('100'), 'Строка').toThrow(ValidationError);
    expect(() => formatMoney(NaN), 'NaN').toThrow(message);
  });

  it('обратное преобразование', () => {
    expect(formatMoney(toKopecks('1200,5')), 'Туда и обратно').toBe('1 200,50 ₽');
  });
});
