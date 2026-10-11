import { planDispatch } from './index.js';

const stock = [
  { sku: 'RUN-42', quantity: 7 },
  { sku: 'CAP-01', quantity: 0 },
  { sku: 'SOCK-07', quantity: 4 },
];

describe('planDispatch', () => {
  it('готовый заказ попадает в ready', () => {
    const orders = [{ id: 'A-1', status: 'paid', lines: [{ sku: 'RUN-42', quantity: 2 }] }];
    expect(planDispatch(orders, stock), 'Остатка хватает').toEqual({ ready: ['A-1'], blocked: [] });
  });

  it('заказ, на который не хватает товара, блокируется', () => {
    const orders = [{ id: 'A-2', status: 'paid', lines: [{ sku: 'RUN-42', quantity: 2 }, { sku: 'CAP-01', quantity: 1 }] }];
    expect(planDispatch(orders, stock), 'Кепок нет на складе').toEqual({
      ready: [],
      blocked: [{ id: 'A-2', missing: ['CAP-01'] }],
    });
  });

  it('неоплаченные заказы игнорируются', () => {
    const orders = [{ id: 'A-3', status: 'new', lines: [{ sku: 'RUN-42', quantity: 1 }] }];
    expect(planDispatch(orders, stock), 'Заказ не оплачен').toEqual({ ready: [], blocked: [] });
  });
});
