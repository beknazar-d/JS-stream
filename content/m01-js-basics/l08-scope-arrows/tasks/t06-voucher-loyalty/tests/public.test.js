import { createVoucherIssuer, createLoyaltyCalculator } from './index.js';

describe('createVoucherIssuer', () => {
  it('выдаёт коды по порядку', () => {
    const issue = createVoucherIssuer('WINTER');
    expect(issue(), 'Первый код').toBe('WINTER-0001');
    expect(issue(), 'Второй код').toBe('WINTER-0002');
  });

  it('начало нумерации можно задать', () => {
    const issue = createVoucherIssuer('SPRING', 15);
    expect(issue(), 'Первый код весенней кампании').toBe('SPRING-0015');
  });
});

describe('createLoyaltyCalculator', () => {
  const calculate = createLoyaltyCalculator(5000, 10);

  it('скидка для крупного заказа', () => {
    expect(calculate('6000'), 'Заказ на 6000').toBe(5400);
  });

  it('без скидки ниже порога', () => {
    expect(calculate('4999'), 'Заказ на 4999').toBe(4999);
  });

  it('пороговая сумма получает скидку', () => {
    expect(calculate('5000'), 'Заказ ровно на порог').toBe(4500);
  });
});
