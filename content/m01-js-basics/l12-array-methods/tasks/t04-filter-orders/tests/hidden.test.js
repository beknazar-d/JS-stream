import { filterOrders } from './index.js';

const orders = [
  { id: 'A-101', status: 'paid', total: 4500, customerName: 'Ирина Соколова' },
  { id: 'A-102', status: 'new', total: 900, customerName: 'Олег Петров' },
  { id: 'A-103', status: 'paid', total: 1000, customerName: 'Ирина Власова' },
  { id: 'A-104', status: 'cancelled', total: 3000, customerName: 'Мария Орлова' },
];

const ids = (list) => list.map((order) => order.id);

describe('filterOrders: границы и пустые условия', () => {
  it('граница суммы включена', () => {
    expect(ids(filterOrders(orders, { minTotal: 1000 })), 'Заказ ровно на 1000 остаётся').toEqual(['A-101', 'A-103', 'A-104']);
  });

  it('пустой фильтр возвращает все заказы', () => {
    expect(ids(filterOrders(orders, {})), 'Фильтр не задан').toEqual(['A-101', 'A-102', 'A-103', 'A-104']);
  });

  it('пустой фильтр возвращает новый массив', () => {
    expect(filterOrders(orders, {}), 'Новый массив, а не исходный').not.toBe(orders);
  });

  it('minTotal равный нулю не отсеивает', () => {
    expect(filterOrders(orders, { minTotal: 0 }), 'Сумма от нуля').toHaveLength(4);
  });
});

describe('filterOrders: сочетание условий', () => {
  it('все условия действуют вместе', () => {
    const result = filterOrders(orders, { status: 'paid', minTotal: 2000, query: 'СОКОЛОВА' });
    expect(ids(result), 'Оплаченные от 2000 с фамилией Соколова').toEqual(['A-101']);
  });

  it('ничего не подошло', () => {
    expect(filterOrders(orders, { status: 'shipped' }), 'Отправленных нет').toEqual([]);
  });
});

describe('filterOrders: регистр и исходные данные', () => {
  it('регистр запроса не важен', () => {
    expect(ids(filterOrders(orders, { query: 'ОЛЕГ' })), 'Запрос заглавными').toEqual(['A-102']);
  });

  it('исходный массив не меняется', () => {
    filterOrders(orders, { status: 'paid' });
    expect(orders, 'Список заказов после фильтрации').toHaveLength(4);
  });
});
