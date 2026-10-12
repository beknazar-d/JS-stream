import { createWarehouse } from './index.js';

describe('createWarehouse: граница остатка', () => {
  it('можно зарезервировать весь остаток', () => {
    const warehouse = createWarehouse({ kettle: 5 });
    expect(warehouse.reserve('kettle', 5).ok, 'Запрос ровно на весь остаток').toBe(true);
    expect(warehouse.available('kettle'), 'Остаток после резерва всего').toBe(0);
  });

  it('некорректное количество отклоняется', () => {
    const warehouse = createWarehouse({ kettle: 5 });
    expect(warehouse.reserve('kettle', 0).ok, 'Количество 0').toBe(false);
    expect(warehouse.reserve('kettle', -1).ok, 'Количество -1').toBe(false);
    expect(warehouse.reserve('kettle', 1.5).ok, 'Количество 1.5').toBe(false);
    expect(warehouse.available('kettle'), 'Остаток не изменился').toBe(5);
  });
});

describe('createWarehouse: снятие резерва', () => {
  it('release возвращает товар на склад', () => {
    const warehouse = createWarehouse({ kettle: 5 });
    const { id } = warehouse.reserve('kettle', 3);
    expect(warehouse.release(id), 'Резерв был').toBe(true);
    expect(warehouse.available('kettle'), 'Товар вернулся').toBe(5);
  });

  it('повторный release не увеличивает остаток', () => {
    const warehouse = createWarehouse({ kettle: 5 });
    const { id } = warehouse.reserve('kettle', 3);
    warehouse.release(id);
    expect(warehouse.release(id), 'Резерв уже снят').toBe(false);
    expect(warehouse.available('kettle'), 'Остаток не больше начального').toBe(5);
  });

  it('release неизвестного id', () => {
    const warehouse = createWarehouse({ kettle: 5 });
    expect(warehouse.release('no-such-id'), 'Такого резерва нет').toBe(false);
    expect(warehouse.available('kettle'), 'Остаток не изменился').toBe(5);
  });

  it('разные резервы получают разные id и снимаются по отдельности', () => {
    const warehouse = createWarehouse({ kettle: 5 });
    const first = warehouse.reserve('kettle', 1);
    const second = warehouse.reserve('kettle', 2);
    expect(first.id === second.id, 'id должны различаться').toBe(false);
    warehouse.release(first.id);
    expect(warehouse.available('kettle'), 'Снят только первый резерв').toBe(3);
  });
});

describe('createWarehouse: изоляция данных', () => {
  it('объект initialStock не меняется', () => {
    const initial = { kettle: 5, cup: 20 };
    const warehouse = createWarehouse(initial);
    const { id } = warehouse.reserve('kettle', 2);
    warehouse.release(id);
    warehouse.reserve('cup', 4);
    expect(initial, 'Переданный объект остался прежним').toEqual({ kettle: 5, cup: 20 });
  });

  it('правка initialStock снаружи не влияет на склад', () => {
    const initial = { kettle: 5 };
    const warehouse = createWarehouse(initial);
    initial.kettle = 100;
    initial.cup = 7;
    expect(warehouse.available('kettle'), 'Склад скопировал остатки при создании').toBe(5);
    expect(warehouse.available('cup'), 'Новый артикул снаружи не появился').toBe(0);
  });

  it('snapshot возвращает копию', () => {
    const warehouse = createWarehouse({ kettle: 5, cup: 0 });
    const snapshot = warehouse.snapshot();
    expect(snapshot, 'Остатки включают нулевые').toEqual({ kettle: 5, cup: 0 });
    snapshot.kettle = 999;
    expect(warehouse.available('kettle'), 'Правка копии не меняет склад').toBe(5);
  });

  it('snapshot отражает резервы', () => {
    const warehouse = createWarehouse({ kettle: 5 });
    warehouse.reserve('kettle', 2);
    expect(warehouse.snapshot(), 'Доступные остатки после резерва').toEqual({ kettle: 3 });
  });

  it('два склада независимы', () => {
    const first = createWarehouse({ kettle: 5 });
    const second = createWarehouse({ kettle: 5 });
    first.reserve('kettle', 5);
    expect(second.available('kettle'), 'Во втором складе остаток не тронут').toBe(5);
  });
});
