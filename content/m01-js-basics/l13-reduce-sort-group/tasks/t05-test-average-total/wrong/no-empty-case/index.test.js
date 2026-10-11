import { averagePaidTotal } from './index.js';

describe('averagePaidTotal', () => {
  it('считает среднее по оплаченным заказам', () => {
    const orders = [{ status: 'paid', total: 1000 }, { status: 'paid', total: 3000 }];
    expect(averagePaidTotal(orders), 'Два оплаченных заказа').toBe(2000);
  });

  it('неоплаченные заказы не входят в среднее', () => {
    const orders = [
      { status: 'paid', total: 1000 },
      { status: 'new', total: 9000 },
      { status: 'paid', total: 3000 },
    ];
    expect(averagePaidTotal(orders), 'Два оплаченных из трёх').toBe(2000);
  });

  it('дробное среднее округляется', () => {
    const orders = [{ status: 'paid', total: 1000 }, { status: 'paid', total: 1001 }];
    expect(averagePaidTotal(orders), 'Среднее 1000,5').toBe(1001);
  });
});
