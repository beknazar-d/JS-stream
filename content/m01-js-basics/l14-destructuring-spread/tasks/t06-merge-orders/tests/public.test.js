import { mergeOrders } from './index.js';

const coffee = { sku: 'A-100', name: 'Кофе зерновой 1 кг', price: 1200, qty: 2 };
const filter = { sku: 'F-10', name: 'Фильтры для кофеварки', price: 300, qty: 1 };

describe('mergeOrders', () => {
  it('объединяет два заказа с разными товарами', () => {
    const a = { id: 1, status: 'new', lines: [coffee] };
    const b = { id: 2, status: 'new', lines: [filter] };
    const result = mergeOrders(a, b);
    expect(result.lines, 'Позиции двух заказов').toEqual([coffee, filter]);
    expect(result.mergedFrom, 'Присоединённые заказы').toEqual([2]);
  });

  it('складывает количество одинаковых товаров', () => {
    const a = { id: 1, status: 'new', lines: [coffee] };
    const b = { id: 2, status: 'new', lines: [{ ...coffee, qty: 3 }] };
    expect(mergeOrders(a, b).lines, 'Один и тот же sku в двух заказах').toEqual([{ ...coffee, qty: 5 }]);
  });
});
