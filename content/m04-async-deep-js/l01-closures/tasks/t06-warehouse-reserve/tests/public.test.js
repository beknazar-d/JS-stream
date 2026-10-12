import { createWarehouse } from './index.js';

describe('createWarehouse: резервы', () => {
  it('начальные остатки', () => {
    const warehouse = createWarehouse({ kettle: 5, cup: 20 });
    expect(warehouse.available('kettle'), 'Остаток чайников').toBe(5);
    expect(warehouse.available('cup'), 'Остаток кружек').toBe(20);
    expect(warehouse.available('unknown'), 'Неизвестный артикул').toBe(0);
  });

  it('резерв уменьшает остаток', () => {
    const warehouse = createWarehouse({ kettle: 5 });
    const result = warehouse.reserve('kettle', 2);
    expect(result.ok, 'Резерв выдан').toBe(true);
    expect(result.id, 'id резерва — строка').toBeTypeOf('string');
    expect(warehouse.available('kettle'), 'Остаток после резерва').toBe(3);
  });

  it('отказ, если товара не хватает', () => {
    const warehouse = createWarehouse({ kettle: 5 });
    expect(warehouse.reserve('kettle', 6), 'Запрос больше остатка').toEqual({ ok: false, reason: 'not-enough' });
    expect(warehouse.available('kettle'), 'Остаток не изменился').toBe(5);
  });

  it('отказ для неизвестного артикула', () => {
    const warehouse = createWarehouse({ kettle: 5 });
    expect(warehouse.reserve('teapot', 1), 'Артикула нет на складе').toEqual({ ok: false, reason: 'unknown-sku' });
  });
});
