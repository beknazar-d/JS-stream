import { shippingCost } from './index.js';

describe('shippingCost: обычная доставка', () => {
  it('лёгкая посылка рядом', () => {
    expect(shippingCost(2, 50), 'Вес 2 кг, 50 км').toBe(200);
  });

  it('тяжёлая посылка далеко', () => {
    expect(shippingCost(5, 250), 'Вес 5 кг, 250 км').toBe(580);
  });

  it('граница тарифа без доплат', () => {
    expect(shippingCost(3, 100), 'Вес 3 кг, 100 км').toBe(200);
  });
});

describe('shippingCost: экспресс', () => {
  it('экспресс удваивает стоимость', () => {
    expect(shippingCost(2, 50, true), 'Экспресс, вес 2 кг, 50 км').toBe(400);
  });
});
