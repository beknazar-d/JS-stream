import { canApplyPromo } from './index.js';

describe('canApplyPromo', () => {
  it('применяется к большому заказу члена клуба', () => {
    expect(canApplyPromo(5000, true, false), 'Заказ 5000, член клуба').toBe(true);
  });

  it('не применяется к маленькому заказу', () => {
    expect(canApplyPromo(1000, true, false), 'Заказ 1000').toBe(false);
  });
});
