import { canApplyPromo } from './index.js';

describe('canApplyPromo', () => {
  it('применяется к заказу члена клуба', () => {
    expect(canApplyPromo(5000, true, false), 'Заказ 5000, член клуба').toBe(true);
  });

  it('не применяется ниже порога', () => {
    expect(canApplyPromo(1000, true, false), 'Заказ 1000').toBe(false);
  });

  it('не член клуба: зависит от суммы', () => {
    expect(canApplyPromo(5000, false, false), 'Заказ 5000, не член клуба').toBe(false);
    expect(canApplyPromo(10000, false, false), 'Заказ 10000, не член клуба').toBe(true);
  });

  it('не применяется повторно', () => {
    expect(canApplyPromo(5000, true, true), 'Промокод уже использован').toBe(false);
  });
});
