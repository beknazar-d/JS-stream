import { canFulfill } from './index.js';

describe('canFulfill', () => {
  it('разрешает, когда товара хватает', () => {
    expect(canFulfill(3, 10), 'Запрос 3 при остатке 10').toBe(true);
  });

  it('отказывает, когда товара не хватает', () => {
    expect(canFulfill(30, 10), 'Запрос 30 при остатке 10').toBe(false);
  });
});
