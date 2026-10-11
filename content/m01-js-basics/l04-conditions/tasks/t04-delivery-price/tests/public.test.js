import { deliveryPrice } from './index.js';

describe('deliveryPrice: базовая цена по зоне', () => {
  it('зона A', () => {
    expect(deliveryPrice('A', 3, 1000), 'Зона A, 3 кг, заказ 1000').toBe(200);
  });

  it('зона B', () => {
    expect(deliveryPrice('B', 3, 1000), 'Зона B, 3 кг, заказ 1000').toBe(350);
  });

  it('зона C', () => {
    expect(deliveryPrice('C', 3, 1000), 'Зона C, 3 кг, заказ 1000').toBe(600);
  });
});

describe('deliveryPrice: бесплатная доставка и ошибки', () => {
  it('заказ от 5000 доставляется бесплатно', () => {
    expect(deliveryPrice('A', 3, 5000), 'Заказ ровно на 5000').toBe(0);
  });

  it('неизвестная зона', () => {
    expect(deliveryPrice('X', 3, 1000), 'Зона X').toBeNull();
  });
});
