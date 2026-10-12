import { readWeight } from './index.js';

describe('readWeight: корректные значения', () => {
  it('число возвращается как есть', () => {
    expect(readWeight(2.5), 'Число 2.5').toBe(2.5);
  });
  it('строка с числом разбирается', () => {
    expect(readWeight('2.5'), 'Строка "2.5"').toBe(2.5);
    expect(readWeight('12'), 'Строка "12"').toBe(12);
  });
});

describe('readWeight: ошибки', () => {
  it('буквы дают ошибку', () => {
    expect(() => readWeight('abc'), 'Строка "abc"').toThrow('Вес должен быть положительным числом');
  });
  it('null дает ошибку', () => {
    expect(() => readWeight(null), 'Значение null').toThrow('Вес должен быть положительным числом');
  });
});
