import { paginate } from './index.js';

const orders = Array.from({ length: 25 }, (_, index) => ({ id: 1000 + index, city: 'Казань' }));

describe('paginate', () => {
  it('первая страница содержит первые элементы', () => {
    const result = paginate(orders, 1, 10);
    expect(result.items.map((order: { id: number }) => order.id), 'Номера заказов на первой странице').toEqual([1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009]);
    expect(result.page, 'Номер страницы').toBe(1);
    expect(result.totalPages, 'Страниц для 25 элементов по 10').toBe(3);
  });

  it('последняя страница неполная', () => {
    const result = paginate(orders, 3, 10);
    expect(result.items, 'Остаток на третьей странице').toHaveLength(5);
    expect(result.items[0], 'Первый элемент третьей страницы').toEqual({ id: 1020, city: 'Казань' });
  });

  it('пустой список', () => {
    expect(paginate([], 1, 10), 'Пустой список').toEqual({ items: [], page: 1, totalPages: 0 });
  });
});
