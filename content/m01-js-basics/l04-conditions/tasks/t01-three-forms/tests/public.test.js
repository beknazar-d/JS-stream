import { deliveryDays, stockLabel, serviceName } from './index.js';

describe('deliveryDays', () => {
  it('срок по коду зоны', () => {
    expect(deliveryDays('A'), 'Зона A').toBe(1);
    expect(deliveryDays('B'), 'Зона B').toBe(2);
    expect(deliveryDays('C'), 'Зона C').toBe(4);
  });

  it('неизвестная зона даёт 7 дней', () => {
    expect(deliveryDays('X'), 'Зона X').toBe(7);
    expect(deliveryDays(''), 'Пустой код зоны').toBe(7);
  });
});

describe('stockLabel', () => {
  it('нулевой остаток', () => {
    expect(stockLabel(0), 'Остаток 0').toBe('Нет в наличии');
  });

  it('малый остаток включает границу 5', () => {
    expect(stockLabel(1), 'Остаток 1').toBe('Мало');
    expect(stockLabel(5), 'Остаток 5').toBe('Мало');
  });

  it('большой остаток', () => {
    expect(stockLabel(6), 'Остаток 6').toBe('В наличии');
    expect(stockLabel(200), 'Остаток 200').toBe('В наличии');
  });
});

describe('serviceName', () => {
  it('название тарифа', () => {
    expect(serviceName(true), 'Экспресс-доставка').toBe('Экспресс');
    expect(serviceName(false), 'Обычная доставка').toBe('Обычная');
  });
});
