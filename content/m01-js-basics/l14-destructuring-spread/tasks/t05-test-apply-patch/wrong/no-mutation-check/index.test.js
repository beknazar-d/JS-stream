import { applyPatch } from './index.js';

const makeOrder = () => ({ id: 1042, status: 'new', customer: { name: 'Анна Ким', city: 'Казань' } });

describe('applyPatch', () => {
  it('сливает клиента', () => {
    const result = applyPatch(makeOrder(), { customer: { city: 'Самара' } });
    expect(result.customer, 'Клиент после правки города').toEqual({ name: 'Анна Ким', city: 'Самара' });
  });

  it('игнорирует id', () => {
    const result = applyPatch(makeOrder(), { id: 999, status: 'paid' });
    expect(result.id, 'Номер заказа').toBe(1042);
    expect(result.status, 'Статус').toBe('paid');
  });
});
