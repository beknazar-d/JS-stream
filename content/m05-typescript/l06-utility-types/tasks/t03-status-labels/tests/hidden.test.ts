import { countByStatus, labelOf, type Delivery } from './index.js';

describe('подписи и сводка: детали', () => {
  it('пустой список даёт нули по всем статусам', () => {
    expect(countByStatus([]), 'Пустой список').toEqual({ created: 0, packed: 0, onTheWay: 0, delivered: 0, returned: 0 });
  });

  it('исходный список не меняется', () => {
    const list: Delivery[] = [{ id: 1, status: 'created' }];
    countByStatus(list);
    expect(list, 'Список после вызова').toEqual([{ id: 1, status: 'created' }]);
  });

  it('разные вызовы дают независимые результаты', () => {
    const first = countByStatus([{ id: 1, status: 'created' }]);
    const second = countByStatus([]);
    expect(first.created, 'Первый вызов').toBe(1);
    expect(second.created, 'Второй вызов не видит данных первого').toBe(0);
  });

  it('все подписи — непустые строки', () => {
    for (const status of ['created', 'packed', 'onTheWay', 'delivered', 'returned'] as const) {
      expect(labelOf(status).length, `Подпись для ${status}`).toBeGreaterThan(0);
    }
  });
});
