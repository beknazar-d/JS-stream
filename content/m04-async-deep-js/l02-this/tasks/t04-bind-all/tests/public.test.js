import { bindAll } from './index.js';

function createCart() {
  return {
    title: 'Корзина',
    items: [],
    add(price) {
      this.items.push(price);
      return this.items.length;
    },
    total() {
      let sum = 0;
      for (const price of this.items) {
        sum = sum + price;
      }
      return sum;
    },
  };
}

describe('bindAll: основное', () => {
  it('методы работают после извлечения', () => {
    const cart = createCart();
    bindAll(cart);
    const { add, total } = cart;
    add(100);
    add(250);
    expect(total(), 'Сумма через извлечённые методы').toBe(350);
  });

  it('метод можно передать в колбэк', () => {
    const cart = createCart();
    bindAll(cart);
    [100, 200, 300].forEach(cart.add);
    expect(cart.items, 'Все цены добавлены').toEqual([100, 200, 300]);
  });

  it('не функции остаются как были', () => {
    const cart = createCart();
    bindAll(cart);
    expect(cart.title, 'Строковое свойство').toBe('Корзина');
    expect(cart.items, 'Свойство-массив').toEqual([]);
  });
});
