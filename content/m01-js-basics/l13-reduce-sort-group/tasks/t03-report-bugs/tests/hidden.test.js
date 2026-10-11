import { cartTotal, cheapestFirst } from './index.js';

describe('cartTotal: краевые случаи', () => {
  it('пустая корзина', () => {
    expect(cartTotal([]), 'Итог пустой корзины').toBe(0);
  });

  it('одна позиция', () => {
    expect(cartTotal([{ name: 'Кепка', price: 1200, quantity: 2 }]), 'Одна позиция').toBe(2400);
  });

  it('результат — число', () => {
    expect(cartTotal([{ name: 'Кепка', price: 1200, quantity: 1 }, { name: 'Шарф', price: 900, quantity: 1 }]), 'Тип итога').toBeTypeOf('number');
  });
});

describe('cheapestFirst: краевые случаи', () => {
  it('сортирует как числа, а не как строки', () => {
    const items = [
      { name: 'Куртка', price: 9000, quantity: 1 },
      { name: 'Шарф', price: 900, quantity: 1 },
      { name: 'Кепка', price: 1200, quantity: 1 },
      { name: 'Носки', price: 300, quantity: 1 },
    ];
    expect(cheapestFirst(items).map((item) => item.price), 'Цены по возрастанию').toEqual([300, 900, 1200, 9000]);
  });

  it('возвращает другой массив', () => {
    const items = [{ name: 'Кепка', price: 1200, quantity: 1 }];
    expect(cheapestFirst(items), 'Новый массив').not.toBe(items);
  });

  it('равные цены сохраняют исходный порядок', () => {
    const items = [
      { name: 'Шарф', price: 500, quantity: 1 },
      { name: 'Кепка', price: 500, quantity: 1 },
      { name: 'Носки', price: 100, quantity: 1 },
    ];
    expect(cheapestFirst(items).map((item) => item.name), 'Шарф раньше кепки').toEqual(['Носки', 'Шарф', 'Кепка']);
  });

  it('пустая корзина', () => {
    expect(cheapestFirst([]), 'Нечего сортировать').toEqual([]);
  });
});
