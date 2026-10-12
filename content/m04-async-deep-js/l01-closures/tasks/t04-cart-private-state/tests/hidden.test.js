import { createCart } from './index.js';

describe('createCart: независимость', () => {
  it('две корзины не делят состояние', () => {
    const first = createCart();
    const second = createCart();
    first.add('kettle', 2500, 1);
    expect(second.items(), 'Во второй корзине пусто').toEqual([]);
    expect(second.count(), 'Счётчик второй корзины').toBe(0);
  });
});

describe('createCart: приватность', () => {
  it('изменение результата items() не меняет корзину', () => {
    const cart = createCart();
    cart.add('kettle', 2500, 1);
    const snapshot = cart.items();
    snapshot.push({ sku: 'hack', price: 1, qty: 1 });
    snapshot[0].qty = 100;
    expect(cart.items(), 'Корзина после правки копии').toEqual([{ sku: 'kettle', price: 2500, qty: 1 }]);
    expect(cart.count(), 'Количество не изменилось').toBe(1);
  });

  it('items() каждый раз возвращает новый массив', () => {
    const cart = createCart();
    cart.add('cup', 400, 1);
    expect(cart.items() === cart.items(), 'Два вызова не должны отдавать один и тот же массив').toBe(false);
  });

  it('список недоступен как свойство', () => {
    const cart = createCart();
    cart.add('cup', 400, 1);
    expect(cart.lines, 'cart.lines').toBeUndefined();
    expect(cart._lines, 'cart._lines').toBeUndefined();
    expect(Array.isArray(cart.items), 'items — метод, а не массив').toBe(false);
  });
});

describe('createCart: удаление', () => {
  it('удаление неизвестного артикула', () => {
    const cart = createCart();
    cart.add('cup', 400, 1);
    expect(cart.remove('unknown'), 'Нет такого артикула').toBe(false);
    expect(cart.count(), 'Корзина не изменилась').toBe(1);
  });

  it('после удаления сумма пересчитывается, повторное добавление работает', () => {
    const cart = createCart();
    cart.add('cup', 400, 2);
    cart.add('plate', 300, 1);
    cart.remove('cup');
    expect(cart.total(), 'Сумма без кружек').toBe(300);
    cart.add('cup', 450, 1);
    expect(cart.items(), 'Кружка вернулась в конец списка').toEqual([
      { sku: 'plate', price: 300, qty: 1 },
      { sku: 'cup', price: 450, qty: 1 },
    ]);
  });
});
