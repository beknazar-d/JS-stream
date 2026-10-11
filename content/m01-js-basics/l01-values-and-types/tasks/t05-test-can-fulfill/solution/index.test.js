import { canFulfill } from './index.js';

describe('canFulfill: обычные случаи', () => {
  it('разрешает, когда товара хватает', () => {
    expect(canFulfill(3, 10), 'Запрос 3 при остатке 10').toBe(true);
  });

  it('разрешает запрос ровно на весь остаток', () => {
    expect(canFulfill(10, 10), 'Запрос 10 при остатке 10').toBe(true);
  });

  it('отказывает, если запрошено больше остатка', () => {
    expect(canFulfill(11, 10), 'Запрос 11 при остатке 10').toBe(false);
  });
});

describe('canFulfill: некорректное количество', () => {
  it('отказывает на нулевое и отрицательное количество', () => {
    expect(canFulfill(0, 10), 'Запрос 0').toBe(false);
    expect(canFulfill(-2, 10), 'Запрос -2').toBe(false);
  });

  it('отказывает на дробное количество', () => {
    expect(canFulfill(1.5, 10), 'Запрос 1.5').toBe(false);
    expect(canFulfill('2.5', 10), 'Запрос "2.5"').toBe(false);
  });

  it('отказывает, если количество не число', () => {
    expect(canFulfill('abc', 10), 'Запрос "abc"').toBe(false);
    expect(canFulfill('', 10), 'Пустое поле количества').toBe(false);
    expect(canFulfill(undefined, 10), 'Количество не передано').toBe(false);
  });
});

describe('canFulfill: строки из форм и выгрузок', () => {
  it('разбирает числа в строках', () => {
    expect(canFulfill('3', '10'), 'Запрос "3" при остатке "10"').toBe(true);
    expect(canFulfill('11', '10'), 'Запрос "11" при остатке "10"').toBe(false);
  });

  it('сравнивает числа, а не строки: 9 меньше 10', () => {
    expect(canFulfill('9', '10'), 'Строки "9" и "10" нельзя сравнивать как текст').toBe(true);
  });

  it('смешанные типы работают', () => {
    expect(canFulfill(5, '10'), 'Число и строка').toBe(true);
    expect(canFulfill('5', 10), 'Строка и число').toBe(true);
  });

  it('остаток не число: заказать нельзя', () => {
    expect(canFulfill(1, 'нет данных'), 'Остаток "нет данных"').toBe(false);
  });
});
