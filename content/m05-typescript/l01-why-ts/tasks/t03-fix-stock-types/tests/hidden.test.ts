import { parseStock, lowStockCount, stockLabel } from './index.js';

describe('parseStock: ещё случаи', () => {
  it('результат — число', () => {
    expect(parseStock('12'), 'Тип результата').toBeTypeOf('number');
    expect(parseStock('12') + 1, 'Число складывается с числом').toBe(13);
  });
  it('дробное значение сохраняется', () => {
    expect(parseStock('2.5'), 'Остаток в килограммах').toBe(2.5);
  });
  it('текст даёт NaN', () => {
    expect(parseStock('нет'), 'Текст вместо числа').toBeNaN();
  });
});

describe('lowStockCount: ещё случаи', () => {
  it('пустой список', () => {
    expect(lowStockCount([], 5), 'Нет позиций').toBe(0);
  });
  it('результат — число, а не склейка', () => {
    expect(lowStockCount([1, 1, 1], 5), 'Три позиции ниже порога').toBe(3);
  });
  it('позиция ровно на пороге не считается', () => {
    expect(lowStockCount([5, 5], 5), 'Остатки равны порогу').toBe(0);
  });
});

describe('stockLabel: ещё случаи', () => {
  it('нулевой остаток', () => {
    expect(stockLabel('Лампа', 0), 'Ноль на складе').toBe('Лампа: 0');
  });
});
