import { shippingLabel } from './index.js';

describe('shippingLabel', () => {
  it('подписывает город и улицу', () => {
    const order = { customer: { address: { city: 'Казань', street: 'Баумана, 12' } } };
    expect(shippingLabel(order), 'Город и улица').toBe('Казань, Баумана, 12');
  });

  it('адрес равен null', () => {
    expect(shippingLabel({ customer: { address: null } }), 'address равен null').toBe('Адрес не указан');
  });

  it('клиент без адреса', () => {
    expect(shippingLabel({ customer: { name: 'Олег' } }), 'Клиент без address').toBe('Адрес не указан');
  });

  it('адрес без улицы', () => {
    const order = { customer: { address: { city: 'Казань' } } };
    expect(shippingLabel(order), 'Только город').toBe('Казань');
  });
});
