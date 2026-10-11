import { toNumber, toText, isNotANumber } from './index.js';

describe('toNumber', () => {
  it('превращает целую строку в число', () => {
    expect(toNumber('15'), 'Остаток "15" из выгрузки').toBe(15);
    expect(toNumber(' 7 '), 'Остаток с пробелами по краям').toBe(7);
  });

  it('понимает дробные значения', () => {
    expect(toNumber('12.5'), 'Вес 12.5 кг приходит строкой').toBe(12.5);
  });

  it('пустая строка даёт 0, текст даёт NaN', () => {
    expect(toNumber(''), 'Пустое поле остатка').toBe(0);
    expect(toNumber('abc'), 'Текст вместо числа').toBeNaN();
  });
});

describe('toText', () => {
  it('превращает число в строку', () => {
    expect(toText(1042), 'Артикул 1042 для этикетки').toBe('1042');
  });

  it('превращает null и true в строки', () => {
    expect(toText(null), 'null становится текстом').toBe('null');
    expect(toText(true), 'true становится текстом').toBe('true');
  });
});

describe('isNotANumber', () => {
  it('возвращает true только для NaN', () => {
    expect(isNotANumber(NaN), 'Само значение NaN').toBe(true);
    expect(isNotANumber(5), 'Обычное число').toBe(false);
  });

  it('не приводит типы: строка "abc" не равна NaN', () => {
    expect(isNotANumber('abc'), 'Строка "abc" остаётся строкой').toBe(false);
  });
});
