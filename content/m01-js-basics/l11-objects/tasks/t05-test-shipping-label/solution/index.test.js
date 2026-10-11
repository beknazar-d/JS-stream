import { shippingLabel } from './index.js';

describe('shippingLabel: полные данные', () => {
  it('подписывает город и улицу', () => {
    const order = { customer: { address: { city: 'Казань', street: 'Баумана, 12' } } };
    expect(shippingLabel(order), 'Город и улица').toBe('Казань, Баумана, 12');
  });
});

describe('shippingLabel: неполный адрес', () => {
  it('адрес без улицы: только город', () => {
    const order = { customer: { address: { city: 'Казань' } } };
    expect(shippingLabel(order), 'Только город').toBe('Казань');
  });

  it('адрес без города: запасная подпись', () => {
    const order = { customer: { address: { street: 'Баумана, 12' } } };
    expect(shippingLabel(order), 'Без города').toBe('город не указан, Баумана, 12');
  });

  it('пустой адрес', () => {
    const order = { customer: { address: {} } };
    expect(shippingLabel(order), 'Адрес без полей').toBe('город не указан');
  });
});

describe('shippingLabel: адреса нет', () => {
  it('заказ без клиента (самовывоз)', () => {
    expect(shippingLabel({ id: 'A-1' }), 'Заказ без customer').toBe('Адрес не указан');
  });

  it('клиент без адреса', () => {
    expect(shippingLabel({ customer: { name: 'Олег' } }), 'Клиент без address').toBe('Адрес не указан');
  });

  it('адрес равен null', () => {
    expect(shippingLabel({ customer: { address: null } }), 'address равен null').toBe('Адрес не указан');
  });
});
