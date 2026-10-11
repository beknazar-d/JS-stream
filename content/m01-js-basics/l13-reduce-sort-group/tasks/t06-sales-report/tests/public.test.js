import { buildReport } from './index.js';

const orders = [
  { id: 'A-101', status: 'paid', total: 4500 },
  { id: 'A-102', status: 'new', total: 900 },
  { id: 'A-103', status: 'paid', total: 1200 },
  { id: 'A-104', status: 'new', total: 300 },
];

describe('buildReport', () => {
  it('группирует заказы по статусам', () => {
    expect(buildReport(orders, 1).byStatus, 'Сводка по статусам').toEqual({
      paid: { count: 2, total: 5700 },
      new: { count: 2, total: 1200 },
    });
  });

  it('считает выручку по оплаченным заказам', () => {
    expect(buildReport(orders, 1).paidRevenue, 'Выручка').toBe(5700);
  });

  it('пример из тикета: топ из одного заказа', () => {
    expect(buildReport(orders, 1).top, 'Самый крупный оплаченный заказ').toEqual(['A-101']);
  });
});
