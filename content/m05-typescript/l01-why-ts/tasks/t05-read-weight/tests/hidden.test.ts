import { readWeight } from './index.js';

const MESSAGE = 'Вес должен быть положительным числом';

describe('readWeight: другие корректные значения', () => {
  it('целое число и большая строка', () => {
    expect(readWeight(40), 'Число 40').toBe(40);
    expect(readWeight('0.75'), 'Строка "0.75"').toBe(0.75);
  });
  it('результат — число', () => {
    expect(readWeight('3'), 'Тип результата для строки').toBeTypeOf('number');
  });
});

describe('readWeight: недопустимые значения', () => {
  it('пустая строка', () => {
    expect(() => readWeight(''), 'Пустая строка').toThrow(MESSAGE);
  });
  it('undefined', () => {
    expect(() => readWeight(undefined), 'Поле не пришло').toThrow(MESSAGE);
  });
  it('объекты и массивы', () => {
    expect(() => readWeight({}), 'Пустой объект').toThrow(MESSAGE);
    expect(() => readWeight([2]), 'Массив').toThrow(MESSAGE);
  });
  it('логические значения', () => {
    expect(() => readWeight(true), 'true').toThrow(MESSAGE);
    expect(() => readWeight(false), 'false').toThrow(MESSAGE);
  });
  it('NaN и бесконечность', () => {
    expect(() => readWeight(NaN), 'NaN').toThrow(MESSAGE);
    expect(() => readWeight(Infinity), 'Infinity').toThrow(MESSAGE);
  });
  it('ноль и отрицательные числа', () => {
    expect(() => readWeight(0), 'Ноль').toThrow(MESSAGE);
    expect(() => readWeight(-3), 'Минус три').toThrow(MESSAGE);
    expect(() => readWeight('0'), 'Строка "0"').toThrow(MESSAGE);
  });
});
