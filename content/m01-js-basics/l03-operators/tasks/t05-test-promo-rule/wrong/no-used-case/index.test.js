import { canApplyPromo } from './index.js';

describe('canApplyPromo', () => {
  it('применяется на границе 3000', () => {
    expect(canApplyPromo(3000, true, false), 'Заказ ровно на 3000').toBe(true);
  });

  it('не применяется ниже границы', () => {
    expect(canApplyPromo(2999, true, false), 'Заказ на 2999').toBe(false);
  });

  it('не член клуба: зависит от суммы', () => {
    expect(canApplyPromo(5000, false, false), 'Заказ 5000, не член клуба').toBe(false);
    expect(canApplyPromo(10000, false, false), 'Заказ 10000, не член клуба').toBe(true);
  });
});
