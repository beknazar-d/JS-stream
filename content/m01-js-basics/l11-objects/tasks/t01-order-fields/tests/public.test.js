import { fieldNames, hasField, deliveryCity } from './index.js';

describe('Поля заказа', () => {
  it('fieldNames возвращает названия полей', () => {
    expect(fieldNames({ id: 'A-101', status: 'new' }), 'Названия полей').toEqual(['id', 'status']);
  });

  it('hasField находит существующее поле', () => {
    expect(hasField({ id: 'A-101', total: 0 }, 'total'), 'Поле total есть, значение 0').toBe(true);
  });

  it('deliveryCity читает город', () => {
    const order = { id: 'A-101', customer: { name: 'Ирина', address: { city: 'Казань' } } };
    expect(deliveryCity(order), 'Город из вложенных данных').toBe('Казань');
  });
});
