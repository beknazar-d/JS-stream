import { averagePaidTotal } from './index.js';

describe('averagePaidTotal', () => {
  it('считает среднее по оплаченным заказам', () => {
    const orders = [{ status: 'paid', total: 1000 }, { status: 'paid', total: 3000 }];
    expect(averagePaidTotal(orders), 'Два оплаченных заказа').toBe(2000);
  });
});
