import { averagePaidTotal } from './index.js';

describe('averagePaidTotal: обычные случаи', () => {
  it('считает среднее по оплаченным заказам', () => {
    const orders = [
      { status: 'paid', total: 1000 },
      { status: 'paid', total: 3000 },
    ];
    expect(averagePaidTotal(orders), 'Два оплаченных заказа').toBe(2000);
  });

  it('один оплаченный заказ', () => {
    expect(averagePaidTotal([{ status: 'paid', total: 4500 }]), 'Среднее из одного').toBe(4500);
  });
});

describe('averagePaidTotal: неоплаченные заказы', () => {
  it('неоплаченные заказы в среднее не входят', () => {
    const orders = [
      { status: 'paid', total: 1000 },
      { status: 'new', total: 9000 },
      { status: 'paid', total: 3000 },
      { status: 'cancelled', total: 500 },
    ];
    expect(averagePaidTotal(orders), 'Среднее по двум оплаченным из четырёх').toBe(2000);
  });
});

describe('averagePaidTotal: нет оплаченных заказов', () => {
  it('пустой список даёт ноль', () => {
    expect(averagePaidTotal([]), 'Заказов нет').toBe(0);
  });

  it('есть заказы, но ни одного оплаченного', () => {
    const orders = [{ status: 'new', total: 900 }, { status: 'cancelled', total: 300 }];
    expect(averagePaidTotal(orders), 'Оплаченных нет').toBe(0);
  });
});

describe('averagePaidTotal: округление', () => {
  it('дробное среднее округляется до целого', () => {
    const orders = [{ status: 'paid', total: 1000 }, { status: 'paid', total: 1001 }];
    expect(averagePaidTotal(orders), 'Среднее 1000,5').toBe(1001);
  });

  it('результат — целое число', () => {
    const orders = [{ status: 'paid', total: 100 }, { status: 'paid', total: 101 }, { status: 'paid', total: 101 }];
    expect(Number.isInteger(averagePaidTotal(orders)), 'Среднее 100,67 округляется').toBe(true);
  });
});
