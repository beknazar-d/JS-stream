import { applyDiscount } from './index.js';

const makeOrder = () => ({ id: 'A-101', status: 'new', total: 1000, customer: { name: 'Ирина' } });

describe('applyDiscount', () => {
  it('считает сумму со скидкой', () => {
    expect(applyDiscount(makeOrder(), 10).total, 'Скидка 10% от 1000').toBe(900);
  });

  it('случай из баг-репорта: исходный заказ не меняется', () => {
    const order = makeOrder();
    applyDiscount(order, 10);
    expect(order.total, 'Сумма исходного заказа после предпросмотра').toBe(1000);
  });
});
