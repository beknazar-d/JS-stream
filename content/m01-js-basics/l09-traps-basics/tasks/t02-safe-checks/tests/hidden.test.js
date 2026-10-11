import { quantityOrOne, sameValue, isNotANumber } from './index.js';

describe('quantityOrOne: границы', () => {
  it('пустая строка остаётся пустой строкой', () => {
    expect(quantityOrOne(''), 'Пустая строка').toBe('');
  });

  it('false остаётся false', () => {
    expect(quantityOrOne(false), 'Значение false').toBe(false);
  });

  it('NaN остаётся NaN', () => {
    expect(quantityOrOne(NaN), 'Значение NaN').toBeNaN();
  });
});

describe('sameValue: границы', () => {
  it('двойное равно дало бы true, а здесь false', () => {
    expect(sameValue(0, ''), 'Ноль и пустая строка').toBe(false);
    expect(sameValue(null, undefined), 'null и undefined').toBe(false);
    expect(sameValue('0', false), 'Строка «0» и false').toBe(false);
  });

  it('одинаковые строки равны', () => {
    expect(sameValue('abc', 'abc'), 'Одинаковые строки').toBe(true);
  });

  it('NaN не равен NaN', () => {
    expect(sameValue(NaN, NaN), 'NaN и NaN').toBe(false);
  });
});

describe('isNotANumber: границы', () => {
  it('только настоящий NaN', () => {
    expect(isNotANumber('abc'), 'Строка «abc»').toBe(false);
    expect(isNotANumber(undefined), 'undefined').toBe(false);
    expect(isNotANumber(''), 'Пустая строка').toBe(false);
    expect(isNotANumber(Number('12px')), 'Результат Number("12px")').toBe(true);
  });
});
