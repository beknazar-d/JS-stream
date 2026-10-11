import { countUnits } from './index.js';

describe('countUnits', () => {
  it('случай из баг-репорта: 12 и 3 дают 15', () => {
    const lines = [
      { sku: 'RUN-42', quantity: '12' },
      { sku: 'SOCK-07', quantity: '3' },
    ];
    expect(countUnits(lines), 'Кроссовки "12" и носки "3"').toBe(15);
  });

  it('результат — число', () => {
    const result = countUnits([{ sku: 'RUN-42', quantity: '2' }]);
    expect(result, 'Тип итога').toBeTypeOf('number');
  });

  it('пустая корзина даёт 0', () => {
    expect(countUnits([]), 'Пустая корзина').toBe(0);
  });
});
