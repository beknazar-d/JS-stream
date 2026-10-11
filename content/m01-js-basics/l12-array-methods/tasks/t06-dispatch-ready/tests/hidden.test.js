import { planDispatch } from './index.js';

const stock = [
  { sku: 'RUN-42', quantity: 7 },
  { sku: 'CAP-01', quantity: 0 },
  { sku: 'SOCK-07', quantity: 4 },
];

const paid = (id, lines) => ({ id, status: 'paid', lines });

describe('planDispatch: граница остатка', () => {
  it('остатка ровно хватает', () => {
    expect(planDispatch([paid('B-1', [{ sku: 'SOCK-07', quantity: 4 }])], stock), 'Нужно 4, есть 4').toEqual({ ready: ['B-1'], blocked: [] });
  });

  it('остатка не хватает на одну единицу', () => {
    expect(planDispatch([paid('B-2', [{ sku: 'SOCK-07', quantity: 5 }])], stock), 'Нужно 5, есть 4').toEqual({
      ready: [],
      blocked: [{ id: 'B-2', missing: ['SOCK-07'] }],
    });
  });
});

describe('planDispatch: неизвестный артикул и пустой заказ', () => {
  it('артикула нет на складе: он недостающий, ошибки нет', () => {
    const result = planDispatch([paid('B-3', [{ sku: 'GLOVE-03', quantity: 1 }])], stock);
    expect(result, 'Артикул GLOVE-03 не заведён').toEqual({ ready: [], blocked: [{ id: 'B-3', missing: ['GLOVE-03'] }] });
  });

  it('заказ без строк готов к отгрузке', () => {
    expect(planDispatch([paid('B-4', [])], stock), 'Нет строк — нечего не хватать').toEqual({ ready: ['B-4'], blocked: [] });
  });

  it('пустой склад блокирует все заказы со строками', () => {
    const result = planDispatch([paid('B-5', [{ sku: 'RUN-42', quantity: 1 }])], []);
    expect(result.blocked, 'Склад пуст').toEqual([{ id: 'B-5', missing: ['RUN-42'] }]);
  });
});

describe('planDispatch: несколько заказов', () => {
  it('порядок сохраняется, лишние статусы отбрасываются', () => {
    const orders = [
      paid('B-6', [{ sku: 'RUN-42', quantity: 1 }]),
      { id: 'B-7', status: 'cancelled', lines: [{ sku: 'RUN-42', quantity: 1 }] },
      paid('B-8', [{ sku: 'CAP-01', quantity: 1 }, { sku: 'GLOVE-03', quantity: 2 }, { sku: 'SOCK-07', quantity: 1 }]),
      paid('B-9', [{ sku: 'SOCK-07', quantity: 2 }]),
    ];
    expect(planDispatch(orders, stock), 'Смешанный список').toEqual({
      ready: ['B-6', 'B-9'],
      blocked: [{ id: 'B-8', missing: ['CAP-01', 'GLOVE-03'] }],
    });
  });

  it('остатки между заказами не резервируются', () => {
    const orders = [paid('B-10', [{ sku: 'SOCK-07', quantity: 3 }]), paid('B-11', [{ sku: 'SOCK-07', quantity: 3 }])];
    expect(planDispatch(orders, stock).ready, 'Оба заказа проверяются независимо').toEqual(['B-10', 'B-11']);
  });

  it('несколько строк с недостающим товаром: порядок строк', () => {
    const orders = [paid('B-12', [{ sku: 'GLOVE-03', quantity: 1 }, { sku: 'RUN-42', quantity: 1 }, { sku: 'CAP-01', quantity: 1 }])];
    expect(planDispatch(orders, stock).blocked, 'missing по порядку строк').toEqual([{ id: 'B-12', missing: ['GLOVE-03', 'CAP-01'] }]);
  });
});

describe('planDispatch: исходные данные', () => {
  it('orders и stock не меняются', () => {
    const orders = [paid('B-13', [{ sku: 'RUN-42', quantity: 1 }])];
    const stockCopy = stock.map((item) => ({ sku: item.sku, quantity: item.quantity }));
    planDispatch(orders, stock);
    expect(orders, 'Заказы после планирования').toEqual([paid('B-13', [{ sku: 'RUN-42', quantity: 1 }])]);
    expect(stock, 'Склад после планирования').toEqual(stockCopy);
  });
});
