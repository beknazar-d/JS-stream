import { firstItem } from './index.js';

describe('firstItem: детали', () => {
  it('не меняет исходный массив', () => {
    const queue = [3, 2, 1];
    firstItem(queue);
    expect(queue, 'Массив после вызова').toEqual([3, 2, 1]);
  });

  it('возвращает ту же ссылку, а не копию', () => {
    const order = { id: 1 };
    expect(firstItem([order]), 'Объект из массива').toBe(order);
  });

  it('значения false, 0 и пустая строка — тоже элементы', () => {
    expect(firstItem([0, 1]), 'Первый элемент ноль').toBe(0);
    expect(firstItem(['', 'a']), 'Первый элемент пустая строка').toBe('');
  });
});
