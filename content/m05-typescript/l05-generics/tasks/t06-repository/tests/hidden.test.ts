import { createRepository } from './index.js';

interface Courier {
  id: string;
  name: string;
}

describe('createRepository: строковые идентификаторы и независимость', () => {
  it('работает с идентификаторами-строками', () => {
    const couriers = createRepository<Courier, string>();
    couriers.add({ id: 'c-17', name: 'Анна' });
    expect(couriers.get('c-17')?.name, 'Курьер c-17').toBe('Анна');
    expect(couriers.get('c-18'), 'Неизвестный курьер').toBeUndefined();
  });

  it('хранилища независимы', () => {
    const first = createRepository<Courier, string>();
    const second = createRepository<Courier, string>();
    first.add({ id: 'c-1', name: 'Анна' });
    expect(second.list(), 'Второе хранилище пусто').toEqual([]);
    expect(second.get('c-1'), 'Запись первого хранилища во втором').toBeUndefined();
  });

  it('list возвращает новый массив', () => {
    const couriers = createRepository<Courier, string>();
    couriers.add({ id: 'c-1', name: 'Анна' });
    const snapshot = couriers.list();
    snapshot.pop();
    expect(couriers.list(), 'Список после изменения копии').toHaveLength(1);
  });

  it('пустое хранилище', () => {
    expect(createRepository<Courier, string>().list(), 'Список нового хранилища').toEqual([]);
  });

  it('удаление не трогает остальные записи', () => {
    const couriers = createRepository<Courier, string>();
    couriers.add({ id: 'a', name: 'Анна' });
    couriers.add({ id: 'b', name: 'Борис' });
    couriers.remove('a');
    expect(couriers.list().map((courier: Courier) => courier.id), 'Оставшиеся записи').toEqual(['b']);
  });
});
