import { firstItem } from './index.js';

describe('firstItem', () => {
  it('возвращает первый заказ очереди', () => {
    const queue = [{ id: 1001, city: 'Казань' }, { id: 1002, city: 'Омск' }];
    expect(firstItem(queue), 'Первый заказ в очереди из двух').toEqual({ id: 1001, city: 'Казань' });
  });

  it('работает со строками', () => {
    expect(firstItem(['Анна', 'Борис']), 'Первый курьер в списке').toBe('Анна');
  });

  it('для пустой очереди возвращает undefined', () => {
    expect(firstItem([]), 'Пустая очередь').toBeUndefined();
  });
});
