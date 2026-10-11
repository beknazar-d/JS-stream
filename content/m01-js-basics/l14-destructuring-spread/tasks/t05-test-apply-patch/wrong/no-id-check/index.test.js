import { applyPatch } from './index.js';

const makeOrder = () => ({ id: 1042, status: 'new', customer: { name: 'Анна Ким', city: 'Казань' } });

describe('applyPatch', () => {
  it('сливает клиента', () => {
    const result = applyPatch(makeOrder(), { customer: { city: 'Самара' } });
    expect(result.customer, 'Клиент после правки города').toEqual({ name: 'Анна Ким', city: 'Самара' });
  });

  it('не меняет исходный заказ', () => {
    const order = makeOrder();
    applyPatch(order, { status: 'paid', customer: { city: 'Самара' } });
    expect(order, 'Исходный заказ после вызова').toEqual(makeOrder());
  });

  it('возвращает новый объект', () => {
    const order = makeOrder();
    expect(applyPatch(order, {}), 'Результат').not.toBe(order);
  });
});
