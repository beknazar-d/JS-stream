import { priceLabels, hasUnpaid } from './index.js';

describe('priceLabels', () => {
  it('случай из баг-репорта: подписи с названием и ценой', () => {
    const products = [
      { name: 'Кроссовки', price: 4500 },
      { name: 'Носки', price: 300 },
    ];
    expect(priceLabels(products), 'Подписи товаров').toEqual(['Кроссовки: 4500 ₽', 'Носки: 300 ₽']);
  });
});

describe('hasUnpaid', () => {
  it('случай из баг-репорта: все заказы оплачены', () => {
    const orders = [{ id: 'A-1', status: 'paid' }, { id: 'A-2', status: 'paid' }];
    expect(hasUnpaid(orders), 'Все оплачены — баннер не нужен').toBe(false);
  });

  it('есть неоплаченный заказ', () => {
    const orders = [{ id: 'A-1', status: 'new' }];
    expect(hasUnpaid(orders), 'Один новый заказ').toBe(true);
  });
});
