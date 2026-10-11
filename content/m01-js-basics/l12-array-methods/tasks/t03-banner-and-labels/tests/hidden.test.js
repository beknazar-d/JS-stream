import { priceLabels, hasUnpaid } from './index.js';

describe('priceLabels: краевые случаи', () => {
  it('цена 0 остаётся в подписи', () => {
    expect(priceLabels([{ name: 'Подарок', price: 0 }]), 'Бесплатный товар').toEqual(['Подарок: 0 ₽']);
  });

  it('пустой каталог', () => {
    expect(priceLabels([]), 'Пустой каталог').toEqual([]);
  });

  it('исходные товары не меняются', () => {
    const products = [{ name: 'Кепка', price: 1200 }];
    priceLabels(products);
    expect(products, 'Каталог после подписей').toEqual([{ name: 'Кепка', price: 1200 }]);
  });
});

describe('hasUnpaid: краевые случаи', () => {
  it('неоплаченный заказ среди оплаченных', () => {
    const orders = [
      { id: 'A-1', status: 'paid' },
      { id: 'A-2', status: 'new' },
      { id: 'A-3', status: 'paid' },
    ];
    expect(hasUnpaid(orders), 'Один неоплаченный из трёх').toBe(true);
  });

  it('пустой список', () => {
    expect(hasUnpaid([]), 'Заказов нет — неоплаченных нет').toBe(false);
  });

  it('результат — именно true или false', () => {
    expect(hasUnpaid([{ id: 'A-1', status: 'new' }]), 'Тип результата').toBeTypeOf('boolean');
  });
});
