import { fieldNames, hasField, deliveryCity } from './index.js';

describe('hasField', () => {
  it('поле со значением undefined всё равно есть', () => {
    expect(hasField({ note: undefined }, 'note'), 'Поле note со значением undefined').toBe(true);
  });

  it('отсутствующее поле', () => {
    expect(hasField({ id: 'A-101' }, 'total'), 'Поля total нет').toBe(false);
  });

  it('унаследованные свойства не считаются полями заказа', () => {
    expect(hasField({ id: 'A-101' }, 'toString'), 'toString — не поле заказа').toBe(false);
  });
});

describe('fieldNames', () => {
  it('пустой заказ', () => {
    expect(fieldNames({}), 'У пустого объекта нет полей').toEqual([]);
  });
});

describe('deliveryCity', () => {
  it('нет клиента', () => {
    expect(deliveryCity({ id: 'A-102' }), 'Заказ без customer').toBe('город не указан');
  });

  it('нет адреса (самовывоз)', () => {
    expect(deliveryCity({ id: 'A-103', customer: { name: 'Олег' } }), 'Заказ без address').toBe('город не указан');
  });

  it('адрес без города', () => {
    expect(deliveryCity({ customer: { address: { street: 'Баумана, 12' } } }), 'Адрес без city').toBe('город не указан');
  });
});
