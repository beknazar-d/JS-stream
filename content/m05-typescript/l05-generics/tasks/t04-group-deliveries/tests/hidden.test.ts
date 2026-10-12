import { groupBy } from './index.js';

describe('groupBy: детали', () => {
  it('ключи из прототипа объекта работают как обычные', () => {
    const grouped = groupBy([{ name: 'constructor' }, { name: 'toString' }, { name: 'constructor' }], (item: { name: string }) => item.name);
    expect(grouped['constructor'], 'Две записи с ключом constructor').toHaveLength(2);
    expect(grouped['toString'], 'Одна запись с ключом toString').toHaveLength(1);
  });

  it('исходный список не меняется', () => {
    const list = ['a', 'bb', 'cc'];
    groupBy(list, (word: string) => String(word.length));
    expect(list, 'Список после вызова').toEqual(['a', 'bb', 'cc']);
  });

  it('элементы остаются теми же объектами', () => {
    const item = { id: 1, zone: 'north' };
    const grouped = groupBy([item], (value: { zone: string }) => value.zone);
    expect(grouped['north'][0], 'Объект в группе').toBe(item);
  });
});
