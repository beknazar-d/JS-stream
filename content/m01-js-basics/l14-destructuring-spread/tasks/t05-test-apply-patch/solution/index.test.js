import { applyPatch } from './index.js';

const makeOrder = () => ({
  id: 1042,
  status: 'new',
  customer: { name: 'Анна Ким', city: 'Казань' },
});

describe('applyPatch: обычные правки', () => {
  it('меняет статус и сохраняет остальные поля', () => {
    const result = applyPatch(makeOrder(), { status: 'paid' });
    expect(result, 'Заказ после смены статуса').toEqual({ ...makeOrder(), status: 'paid' });
  });

  it('добавляет новое поле из правки', () => {
    const result = applyPatch(makeOrder(), { note: 'Позвонить за час' });
    expect(result.note, 'Заметка из правки').toBe('Позвонить за час');
  });
});

describe('applyPatch: вложенный клиент', () => {
  it('сливает клиента, а не заменяет его', () => {
    const result = applyPatch(makeOrder(), { customer: { city: 'Самара' } });
    expect(result.customer, 'Клиент после правки города').toEqual({ name: 'Анна Ким', city: 'Самара' });
  });
});

describe('applyPatch: номер заказа', () => {
  it('игнорирует id в правке', () => {
    const result = applyPatch(makeOrder(), { id: 999, status: 'paid' });
    expect(result.id, 'Номер заказа не меняется').toBe(1042);
    expect(result.status, 'Остальная правка применяется').toBe('paid');
  });
});

describe('applyPatch: исходные данные', () => {
  it('не меняет исходный заказ', () => {
    const order = makeOrder();
    applyPatch(order, { status: 'paid', customer: { city: 'Самара' } });
    expect(order, 'Исходный заказ после вызова').toEqual(makeOrder());
  });

  it('возвращает новый объект', () => {
    const order = makeOrder();
    expect(applyPatch(order, {}), 'Результат с пустой правкой').not.toBe(order);
  });

  it('не меняет правку', () => {
    const patch = { id: 5, customer: { city: 'Самара' } };
    applyPatch(makeOrder(), patch);
    expect(patch, 'Правка после вызова').toEqual({ id: 5, customer: { city: 'Самара' } });
  });
});
