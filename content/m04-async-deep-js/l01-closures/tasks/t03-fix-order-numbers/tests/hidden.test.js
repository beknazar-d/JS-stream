import { createNumbering } from './index.js';

describe('createNumbering: формат', () => {
  it('десятый номер', () => {
    const next = createNumbering('ORD');
    let value;
    for (let i = 0; i < 10; i++) {
      value = next();
    }
    expect(value, 'Десятый номер должен быть ORD-0010').toBe('ORD-0010');
  });

  it('после 9999 номер не обрезается', () => {
    const next = createNumbering('ORD');
    let value;
    for (let i = 0; i < 10000; i++) {
      value = next();
    }
    expect(value, 'Номер 10000').toBe('ORD-10000');
  });
});

describe('createNumbering: независимость', () => {
  it('заказы и возвраты считаются отдельно', () => {
    const nextOrder = createNumbering('ORD');
    const nextReturn = createNumbering('RET');
    nextOrder();
    nextOrder();
    expect(nextReturn(), 'Первый возврат после двух заказов').toBe('RET-0001');
    expect(nextOrder(), 'Третий заказ').toBe('ORD-0003');
  });

  it('два счётчика с одним префиксом независимы', () => {
    const first = createNumbering('ORD');
    const second = createNumbering('ORD');
    first();
    first();
    expect(second(), 'Второй счётчик начинает с единицы').toBe('ORD-0001');
  });
});
