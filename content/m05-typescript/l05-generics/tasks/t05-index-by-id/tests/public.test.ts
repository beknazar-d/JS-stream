import { findById, indexById } from './index.js';

const cells = [
  { id: 11, code: 'A-01', free: true },
  { id: 12, code: 'A-02', free: false },
  { id: 13, code: 'B-01', free: true },
];

describe('findById', () => {
  it('находит запись по id', () => {
    expect(findById(cells, 12), 'Ячейка с id 12').toEqual({ id: 12, code: 'A-02', free: false });
  });

  it('возвращает undefined, если записи нет', () => {
    expect(findById(cells, 99), 'Несуществующий id').toBeUndefined();
  });
});

describe('indexById', () => {
  it('строит словарь id → запись', () => {
    const index = indexById(cells);
    expect(index.size, 'Размер словаря').toBe(3);
    expect(index.get(13), 'Запись по id 13').toEqual({ id: 13, code: 'B-01', free: true });
  });
});
