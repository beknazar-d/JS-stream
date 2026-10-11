import { canApplyPromo } from './index.js';

describe('canApplyPromo: сумма заказа', () => {
  it('применяется при сумме ровно 3000 для члена клуба', () => {
    expect(canApplyPromo(3000, true, false), 'Заказ ровно на 3000').toBe(true);
  });

  it('не применяется при сумме меньше 3000', () => {
    expect(canApplyPromo(2999, true, false), 'Заказ на 2999').toBe(false);
  });
});

describe('canApplyPromo: клуб', () => {
  it('без клуба не применяется к заказу до 10000', () => {
    expect(canApplyPromo(5000, false, false), 'Заказ 5000, не член клуба').toBe(false);
  });

  it('без клуба применяется к заказу от 10000', () => {
    expect(canApplyPromo(10000, false, false), 'Заказ ровно на 10000, не член клуба').toBe(true);
  });
});

describe('canApplyPromo: повторное использование', () => {
  it('не применяется, если промокод уже использован', () => {
    expect(canApplyPromo(5000, true, true), 'Заказ 5000, член клуба, промокод уже использован').toBe(false);
  });
});
