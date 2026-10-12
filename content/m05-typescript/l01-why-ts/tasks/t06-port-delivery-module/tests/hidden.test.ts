import { zoneIndex, deliveryPrice, totalForOrders, receipt } from './index.js';

describe('zoneIndex', () => {
  it('индекс известной и неизвестной зоны', () => {
    expect(zoneIndex('область'), 'Зона «область»').toBe(2);
    expect(zoneIndex('луна'), 'Неизвестная зона').toBe(-1);
  });
});

describe('deliveryPrice: экспресс и вес', () => {
  it('экспресс умножает цену на 1.5 и округляет', () => {
    expect(deliveryPrice('центр', 5, true), 'Центр, экспресс: 150 * 1.5').toBe(225);
    expect(deliveryPrice('пригород', 12.5, true), 'Пригород, экспресс: 310 * 1.5 = 465').toBe(465);
    expect(deliveryPrice('область', 10.2, true), 'Область, 10.2 кг: 420 * 1.5 = 630').toBe(630);
  });
  it('вес ровно 10 кг без доплаты', () => {
    expect(deliveryPrice('область', 10, false), 'Граница 10 кг').toBe(400);
  });
  it('доплата считается за каждый начатый килограмм', () => {
    expect(deliveryPrice('центр', 10.1, false), 'Один начатый лишний килограмм').toBe(170);
  });
});

describe('totalForOrders', () => {
  it('сумма цен', () => {
    expect(totalForOrders([100, 250, 50]), 'Три заказа').toBe(400);
  });
  it('пустой список', () => {
    expect(totalForOrders([]), 'Нет заказов').toBe(0);
  });
});

describe('receipt: ещё случаи', () => {
  it('пустой заказ', () => {
    expect(receipt(1, [], 'EUR'), 'Чек без позиций').toBe('Заказ 1: 0 EUR');
  });
});
