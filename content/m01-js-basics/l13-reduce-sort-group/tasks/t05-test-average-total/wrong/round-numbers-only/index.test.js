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

  it('пустой список', () => {
    expect(averagePaidTotal([]), 'Заказов нет').toBe(0);
  });

  it('нет оплаченных заказов', () => {
    expect(averagePaidTotal([{ status: 'new', total: 500 }]), 'Только новый заказ').toBe(0);
  });
});
