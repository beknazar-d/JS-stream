import { countByStatus, labelOf, statusLabels } from './index.js';

describe('подписи статусов', () => {
  it('labelOf возвращает русские подписи', () => {
    expect(labelOf('onTheWay'), 'Подпись для onTheWay').toBe('В пути');
    expect(labelOf('delivered'), 'Подпись для delivered').toBe('Доставлен');
    expect(labelOf('returned'), 'Подпись для returned').toBe('Возврат');
  });

  it('справочник содержит все пять статусов', () => {
    expect(Object.keys(statusLabels).sort(), 'Ключи справочника').toEqual(['created', 'delivered', 'onTheWay', 'packed', 'returned']);
  });
});

describe('сводка по статусам', () => {
  it('считает посылки по статусам', () => {
    const deliveries = [
      { id: 1, status: 'packed' },
      { id: 2, status: 'packed' },
      { id: 3, status: 'delivered' },
    ] as const;
    expect(countByStatus([...deliveries]), 'Сводка').toEqual({ created: 0, packed: 2, onTheWay: 0, delivered: 1, returned: 0 });
  });
});
