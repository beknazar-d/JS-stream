import { paginate } from './index.js';

describe('paginate: граничные случаи', () => {
  it('страница за пределами списка пуста', () => {
    const result = paginate([1, 2, 3], 5, 2);
    expect(result, 'Страница 5 из 2').toEqual({ items: [], page: 5, totalPages: 2 });
  });

  it('список ровно на целое число страниц', () => {
    const result = paginate(['a', 'b', 'c', 'd'], 2, 2);
    expect(result, 'Четыре элемента по два').toEqual({ items: ['c', 'd'], page: 2, totalPages: 2 });
  });

  it('исходный список не меняется', () => {
    const list = [1, 2, 3, 4, 5];
    paginate(list, 2, 2);
    expect(list, 'Список после вызова').toEqual([1, 2, 3, 4, 5]);
  });

  it('размер страницы больше списка', () => {
    expect(paginate(['x'], 1, 50), 'Один элемент, размер 50').toEqual({ items: ['x'], page: 1, totalPages: 1 });
  });
});
