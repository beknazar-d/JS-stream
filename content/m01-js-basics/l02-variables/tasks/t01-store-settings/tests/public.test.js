import { storeName, freeShippingFrom, maxItemsPerOrder, vatPercent } from './index.js';

describe('Настройки магазина', () => {
  it('storeName: строка "ТехноСклад"', () => {
    expect(storeName, 'Название магазина').toBe('ТехноСклад');
  });

  it('freeShippingFrom: число 5000', () => {
    expect(freeShippingFrom, 'Порог бесплатной доставки в рублях').toBe(5000);
    expect(freeShippingFrom, 'Порог должен быть числом').toBeTypeOf('number');
  });

  it('maxItemsPerOrder: число 20', () => {
    expect(maxItemsPerOrder, 'Лимит позиций в заказе').toBe(20);
    expect(maxItemsPerOrder, 'Лимит должен быть числом').toBeTypeOf('number');
  });

  it('vatPercent: число 20', () => {
    expect(vatPercent, 'Ставка НДС в процентах').toBe(20);
    expect(vatPercent, 'Ставка должна быть числом').toBeTypeOf('number');
  });
});
