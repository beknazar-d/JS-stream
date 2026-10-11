import { filterOrders } from './index.js';

const orders = [
  { id: 'A-101', status: 'paid', total: 4500, customerName: 'Ирина Соколова' },
  { id: 'A-102', status: 'new', total: 900, customerName: 'Олег Петров' },
  { id: 'A-103', status: 'paid', total: 1000, customerName: 'Ирина Власова' },
  { id: 'A-104', status: 'cancelled', total: 3000, customerName: 'Мария Орлова' },
];

const ids = (list) => list.map((order) => order.id);

describe('filterOrders', () => {
  it('фильтр по статусу', () => {
    expect(ids(filterOrders(orders, { status: 'paid' })), 'Оплаченные заказы').toEqual(['A-101', 'A-103']);
  });

  it('фильтр по минимальной сумме', () => {
    expect(ids(filterOrders(orders, { minTotal: 3000 })), 'Сумма от 3000').toEqual(['A-101', 'A-104']);
  });

  it('поиск по имени', () => {
    expect(ids(filterOrders(orders, { query: 'ирина' })), 'Поиск «ирина»').toEqual(['A-101', 'A-103']);
  });
});
