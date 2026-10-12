import { zones, baseRates, zoneIndex, deliveryPrice, totalForOrders, receipt } from './index.js';

describe('Справочники', () => {
  it('зоны и тарифы не изменились', () => {
    expect(zones, 'Зоны').toEqual(['центр', 'пригород', 'область']);
    expect(baseRates, 'Базовые тарифы').toEqual([150, 250, 400]);
  });
});

describe('deliveryPrice', () => {
  it('центр, лёгкая посылка', () => {
    expect(deliveryPrice('центр', 5, false), 'Центр, 5 кг').toBe(150);
  });
  it('пригород, тяжёлая посылка', () => {
    expect(deliveryPrice('пригород', 12.5, false), 'Пригород, 12.5 кг: 250 плюс 3 кг по 20').toBe(310);
  });
  it('неизвестная зона', () => {
    expect(() => deliveryPrice('луна', 1, false), 'Зона «луна»').toThrow('Неизвестная зона: луна');
  });
});

describe('receipt', () => {
  it('собирает чек', () => {
    expect(receipt(7, [100, 250], 'RUB'), 'Чек по заказу 7').toBe('Заказ 7: 350 RUB');
  });
});
