import { shippingLabel } from './index.js';

describe('shippingLabel', () => {
  it('подписывает город и улицу', () => {
    const order = { customer: { address: { city: 'Казань', street: 'Баумана, 12' } } };
    expect(shippingLabel(order), 'Город и улица').toBe('Казань, Баумана, 12');
  });

  it('заказ без клиента', () => {
    expect(shippingLabel({ id: 'A-1' }), 'Заказ без customer').toBe('Адрес не указан');
  });

  it('клиент без адреса', () => {
    expect(shippingLabel({ customer: { name: 'Олег' } }), 'Клиент без address').toBe('Адрес не указан');
  });

  it('адрес без города', () => {
    const order = { customer: { address: { street: 'Баумана, 12' } } };
    expect(shippingLabel(order), 'Без города').toBe('город не указан, Баумана, 12');
  });
});
