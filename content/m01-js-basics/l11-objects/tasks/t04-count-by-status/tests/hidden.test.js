import { countByStatus } from './index.js';

describe('countByStatus: любые статусы', () => {
  it('считает статусы, которых нет в стандартном списке', () => {
    const orders = [
      { id: 'A-1', status: 'cancelled' },
      { id: 'A-2', status: 'refunded' },
      { id: 'A-3', status: 'cancelled' },
    ];
    expect(countByStatus(orders), 'Отменённые и возвращённые').toEqual({ cancelled: 2, refunded: 1 });
  });

  it('один статус на все заказы', () => {
    const orders = [{ id: 'A-1', status: 'paid' }, { id: 'A-2', status: 'paid' }];
    expect(countByStatus(orders), 'Все заказы оплачены').toEqual({ paid: 2 });
  });

  it('в результате нет статусов, которых не было', () => {
    const result = countByStatus([{ id: 'A-1', status: 'new' }]);
    expect(Object.keys(result), 'Единственный ключ — new').toEqual(['new']);
  });
});

describe('countByStatus: заказ без статуса', () => {
  it('считается как unknown', () => {
    const orders = [{ id: 'A-1' }, { id: 'A-2', status: 'new' }, { id: 'A-3' }];
    expect(countByStatus(orders), 'Два заказа без статуса').toEqual({ unknown: 2, new: 1 });
  });

  it('в результате нет ключа undefined', () => {
    const result = countByStatus([{ id: 'A-1' }]);
    expect(Object.hasOwn(result, 'undefined'), 'Ключа undefined быть не должно').toBe(false);
  });
});

describe('countByStatus: исходные данные', () => {
  it('массив заказов не меняется', () => {
    const orders = [{ id: 'A-1', status: 'new' }, { id: 'A-2', status: 'paid' }];
    countByStatus(orders);
    expect(orders, 'Заказы после подсчёта').toEqual([{ id: 'A-1', status: 'new' }, { id: 'A-2', status: 'paid' }]);
  });
});
