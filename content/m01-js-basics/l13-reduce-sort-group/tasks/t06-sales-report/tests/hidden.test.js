import { buildReport } from './index.js';

describe('buildReport: топ заказов', () => {
  it('сортирует по сумме как по числам', () => {
    const orders = [
      { id: 'B-1', status: 'paid', total: 900 },
      { id: 'B-2', status: 'paid', total: 12000 },
      { id: 'B-3', status: 'paid', total: 1500 },
    ];
    expect(buildReport(orders, 3).top, '12000 больше 1500 и 900').toEqual(['B-2', 'B-3', 'B-1']);
  });

  it('при равной сумме порядок задаёт номер', () => {
    const orders = [
      { id: 'B-9', status: 'paid', total: 1000 },
      { id: 'B-2', status: 'paid', total: 1000 },
      { id: 'B-5', status: 'paid', total: 1000 },
    ];
    expect(buildReport(orders, 3).top, 'Равные суммы, по номеру').toEqual(['B-2', 'B-5', 'B-9']);
  });

  it('неоплаченные заказы в топ не попадают', () => {
    const orders = [
      { id: 'B-1', status: 'new', total: 99999 },
      { id: 'B-2', status: 'paid', total: 100 },
    ];
    expect(buildReport(orders, 5).top, 'Только оплаченные').toEqual(['B-2']);
  });

  it('limit больше числа оплаченных', () => {
    const orders = [{ id: 'B-1', status: 'paid', total: 100 }];
    expect(buildReport(orders, 10).top, 'Все оплаченные').toEqual(['B-1']);
  });

  it('limit равен нулю', () => {
    const orders = [{ id: 'B-1', status: 'paid', total: 100 }];
    expect(buildReport(orders, 0).top, 'Топ из нуля заказов').toEqual([]);
  });
});

describe('buildReport: статусы и выручка', () => {
  it('заказ без статуса попадает в unknown', () => {
    const orders = [{ id: 'B-1', total: 300 }, { id: 'B-2', status: 'paid', total: 100 }, { id: 'B-3', total: 200 }];
    expect(buildReport(orders, 1).byStatus, 'Заказы без статуса').toEqual({
      unknown: { count: 2, total: 500 },
      paid: { count: 1, total: 100 },
    });
  });

  it('статусы идут в порядке первого появления', () => {
    const orders = [
      { id: 'B-1', status: 'shipped', total: 1 },
      { id: 'B-2', status: 'new', total: 1 },
      { id: 'B-3', status: 'shipped', total: 1 },
    ];
    expect(Object.keys(buildReport(orders, 1).byStatus), 'Порядок ключей').toEqual(['shipped', 'new']);
  });

  it('нет оплаченных заказов: выручка 0, топ пустой', () => {
    const orders = [{ id: 'B-1', status: 'new', total: 500 }];
    const report = buildReport(orders, 3);
    expect(report.paidRevenue, 'Выручка без оплаченных').toBe(0);
    expect(report.top, 'Топ без оплаченных').toEqual([]);
  });

  it('пустая выгрузка', () => {
    expect(buildReport([], 3), 'Нет заказов').toEqual({ byStatus: {}, paidRevenue: 0, top: [] });
  });
});

describe('buildReport: исходные данные', () => {
  it('порядок заказов не меняется', () => {
    const orders = [
      { id: 'B-3', status: 'paid', total: 100 },
      { id: 'B-1', status: 'paid', total: 900 },
      { id: 'B-2', status: 'new', total: 500 },
    ];
    buildReport(orders, 2);
    expect(orders.map((order) => order.id), 'Порядок выгрузки').toEqual(['B-3', 'B-1', 'B-2']);
  });
});
