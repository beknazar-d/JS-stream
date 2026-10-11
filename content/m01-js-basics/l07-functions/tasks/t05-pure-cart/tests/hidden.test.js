import { addItem } from './index.js';

describe('addItem: чистота', () => {
  it('результат не зависит от предыдущих вызовов', () => {
    addItem(0, 999, 3);
    addItem(500, 100, 1);
    expect(addItem(0, 100, 1), 'Вызов после других вызовов').toBe(100);
  });

  it('одинаковые аргументы дают одинаковый результат', () => {
    expect(addItem(200, 50, 2), 'Первый вызов').toBe(addItem(200, 50, 2));
  });

  it('две корзины не мешают друг другу', () => {
    const first = addItem(0, 100, 1);
    const second = addItem(0, 40, 1);
    expect(addItem(first, 10, 1), 'Первая корзина').toBe(110);
    expect(addItem(second, 10, 1), 'Вторая корзина').toBe(50);
  });

  it('не печатает в консоль', () => {
    const original = console.log;
    console.log = fn();
    addItem(0, 300, 2);
    const called = console.log.mock.calls.length;
    console.log = original;
    expect(called, 'Количество вызовов console.log').toBe(0);
  });
});

describe('addItem: количество', () => {
  it('ноль штук не меняет сумму', () => {
    expect(addItem(400, 150, 0), 'Явное количество 0').toBe(400);
  });

  it('дробная цена', () => {
    expect(addItem(10, 99.5, 2), 'Цена 99.5, 2 штуки').toBeCloseTo(209, 2);
  });
});
