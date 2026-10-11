import { shippingLabel } from './index.js';

describe('shippingLabel', () => {
  it('подписывает город и улицу', () => {
    const order = { customer: { address: { city: 'Казань', street: 'Баумана, 12' } } };
    expect(shippingLabel(order), 'Город и улица').toBe('Казань, Баумана, 12');
  });

  it('адрес без улицы', () => {
    const order = { customer: { address: { city: 'Казань' } } };
    expect(shippingLabel(order), 'Только город').toBe('Казань');
  });
});
