import { createRepository } from './index.js';

interface StockEvent {
  id: number;
  sku: string;
  delta: number;
}

describe('createRepository: числовые идентификаторы', () => {
  it('добавляет и находит запись', () => {
    const events = createRepository<StockEvent>();
    events.add({ id: 1, sku: 'TV-1', delta: 5 });
    events.add({ id: 2, sku: 'TV-2', delta: -1 });
    expect(events.get(2), 'Запись с id 2').toEqual({ id: 2, sku: 'TV-2', delta: -1 });
    expect(events.get(99), 'Неизвестный id').toBeUndefined();
  });

  it('список идёт в порядке добавления', () => {
    const events = createRepository<StockEvent>();
    events.add({ id: 7, sku: 'A', delta: 1 });
    events.add({ id: 3, sku: 'B', delta: 1 });
    events.add({ id: 5, sku: 'C', delta: 1 });
    expect(events.list().map((event: StockEvent) => event.id), 'Порядок id в списке').toEqual([7, 3, 5]);
  });

  it('remove сообщает, была ли запись', () => {
    const events = createRepository<StockEvent>();
    events.add({ id: 1, sku: 'TV-1', delta: 5 });
    expect(events.remove(1), 'Удаление существующей записи').toBe(true);
    expect(events.get(1), 'Запись после удаления').toBeUndefined();
    expect(events.remove(1), 'Повторное удаление').toBe(false);
  });
});
