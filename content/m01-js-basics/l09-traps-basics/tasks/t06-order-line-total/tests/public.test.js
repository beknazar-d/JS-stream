import { orderLineTotal } from './index.js';

describe('orderLineTotal: расчёт', () => {
  it('своя скидка', () => {
    expect(orderLineTotal('1000', '2', '10'), 'Скидка 10%').toBe(1800);
  });

  it('скидка по умолчанию 5%', () => {
    expect(orderLineTotal('1000', '2'), 'Скидка не передана').toBe(1900);
    expect(orderLineTotal('1000', '2', ''), 'Пустое поле скидки').toBe(1900);
  });

  it('нулевая скидка остаётся нулевой', () => {
    expect(orderLineTotal('1000', '2', '0'), 'Скидка «0»').toBe(2000);
  });

  it('остаток на складе ограничивает количество', () => {
    expect(orderLineTotal('1000', '3', '0', '2'), 'Заказ 3 при остатке 2').toBeNull();
    expect(orderLineTotal('1000', '2', '0', '2'), 'Заказ 2 при остатке 2').toBe(2000);
  });
});
