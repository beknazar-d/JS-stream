import { sumPrices, cartTotal, sortPricesAscending } from './index.js';

describe('Пустые списки', () => {
  it('sumPrices([]) равно нулю', () => {
    expect(sumPrices([]), 'Сумма пустого списка').toBe(0);
  });

  it('cartTotal([]) равно нулю', () => {
    expect(cartTotal([]), 'Итог пустой корзины').toBe(0);
  });

  it('sortPricesAscending([]) даёт пустой массив', () => {
    expect(sortPricesAscending([]), 'Сортировка пустого списка').toEqual([]);
  });
});

describe('Сортировка чисел', () => {
  it('числа сортируются как числа, а не как строки', () => {
    expect(sortPricesAscending([1000, 250, 4500, 99]), 'Сравнение как чисел').toEqual([99, 250, 1000, 4500]);
  });

  it('исходный массив не меняется', () => {
    const prices = [900, 1200, 300];
    sortPricesAscending(prices);
    expect(prices, 'Цены после сортировки копии').toEqual([900, 1200, 300]);
  });

  it('повторяющиеся цены сохраняются', () => {
    expect(sortPricesAscending([300, 100, 300]), 'Дубли цен').toEqual([100, 300, 300]);
  });
});

describe('Суммы', () => {
  it('одна позиция', () => {
    expect(cartTotal([{ price: 4500, quantity: 1 }]), 'Одна позиция').toBe(4500);
  });

  it('один элемент в sumPrices', () => {
    expect(sumPrices([700]), 'Сумма из одного числа').toBe(700);
  });
});
