import { findById, indexById } from './index.js';

describe('indexById: детали', () => {
  it('при повторе id остаётся последняя запись', () => {
    const index = indexById([
      { id: 1, name: 'Старая версия' },
      { id: 2, name: 'Другой' },
      { id: 1, name: 'Новая версия' },
    ]);
    expect(index.size, 'Два разных id').toBe(2);
    expect(index.get(1)?.name, 'Последняя запись побеждает').toBe('Новая версия');
  });

  it('пустой список даёт пустой словарь', () => {
    expect(indexById([]).size, 'Пустой список').toBe(0);
  });

  it('записи не копируются', () => {
    const item = { id: 5, name: 'Поставщик' };
    expect(indexById([item]).get(5), 'Объект в словаре').toBe(item);
    expect(findById([item], 5), 'Объект из поиска').toBe(item);
  });

  it('findById не путает id 0', () => {
    expect(findById([{ id: 0, name: 'Нулевой' }], 0)?.name, 'Запись с id 0').toBe('Нулевой');
  });
});
