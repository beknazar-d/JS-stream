import { orderId, customerName, isPaid, itemPrices, tags, describeParcel } from './index.js';

describe('Карточка посылки: значения', () => {
  it('значения остались прежними', () => {
    expect(orderId, 'Номер заказа').toBe(1042);
    expect(customerName, 'Имя клиента').toBe('Анна Соколова');
    expect(isPaid, 'Оплачен ли заказ').toBe(true);
    expect(itemPrices, 'Цены товаров').toEqual([1200, 450, 89]);
    expect(tags, 'Метки').toEqual(['хрупкое', 'срочно']);
  });
});

describe('describeParcel', () => {
  it('собирает строку описания', () => {
    expect(describeParcel(7, 2.5), 'Посылка 7 весом 2.5 кг').toBe('Посылка №7, 2.5 кг');
  });
});
