import { deliveryPrice } from './index.js';

describe('deliveryPrice: надбавка за вес', () => {
  it('до 10 кг включительно надбавки нет', () => {
    expect(deliveryPrice('A', 10, 1000), 'Ровно 10 кг').toBe(200);
  });

  it('свыше 10 кг надбавка 100', () => {
    expect(deliveryPrice('A', 10.5, 1000), '10,5 кг').toBe(300);
    expect(deliveryPrice('B', 25, 1000), 'Ровно 25 кг').toBe(450);
  });

  it('свыше 25 кг надбавка 300', () => {
    expect(deliveryPrice('B', 25.01, 1000), '25,01 кг').toBe(650);
    expect(deliveryPrice('C', 40, 4999), '40 кг, заказ на 4999').toBe(900);
  });
});

describe('deliveryPrice: бесплатная доставка', () => {
  it('заказ от 5000 бесплатный даже для тяжёлой посылки', () => {
    expect(deliveryPrice('C', 40, 5000), 'Заказ 5000, 40 кг').toBe(0);
    expect(deliveryPrice('B', 3, 12000), 'Заказ 12000').toBe(0);
  });

  it('4999 бесплатной доставки не даёт', () => {
    expect(deliveryPrice('A', 3, 4999), 'Заказ 4999').toBe(200);
  });
});

describe('deliveryPrice: некорректные данные', () => {
  it('неизвестная зона отсекается и при бесплатной доставке', () => {
    expect(deliveryPrice('X', 3, 9000), 'Зона X, заказ 9000').toBeNull();
    expect(deliveryPrice('', 3, 1000), 'Пустая зона').toBeNull();
  });

  it('вес должен быть положительным числом', () => {
    expect(deliveryPrice('A', 0, 1000), 'Вес 0').toBeNull();
    expect(deliveryPrice('A', -2, 1000), 'Вес -2').toBeNull();
    expect(deliveryPrice('A', NaN, 1000), 'Вес NaN').toBeNull();
    expect(deliveryPrice('A', undefined, 1000), 'Вес не передан').toBeNull();
  });

  it('некорректный вес отсекается и при бесплатной доставке', () => {
    expect(deliveryPrice('A', 0, 9000), 'Вес 0, заказ 9000').toBeNull();
  });
});
