import { applyDiscount } from './index.js';

const makeOrder = () => ({ id: 'A-101', status: 'new', total: 1000, customer: { name: 'Ирина' } });

describe('applyDiscount: результат', () => {
  it('остальные поля сохраняются', () => {
    const result = applyDiscount(makeOrder(), 10);
    expect(result, 'Весь заказ со скидкой').toEqual({ id: 'A-101', status: 'new', total: 900, customer: { name: 'Ирина' } });
  });

  it('возвращает другой объект', () => {
    const order = makeOrder();
    expect(applyDiscount(order, 10), 'Результат не должен быть тем же объектом').not.toBe(order);
  });

  it('сумма округляется до целых', () => {
    const order = makeOrder();
    order.total = 999;
    expect(applyDiscount(order, 15).total, '999 со скидкой 15% — 849,15, округляем до 849').toBe(849);
  });
});

describe('applyDiscount: граничные скидки', () => {
  it('скидка 0%: сумма та же, но объект новый', () => {
    const order = makeOrder();
    const result = applyDiscount(order, 0);
    expect(result.total, 'Сумма без скидки').toBe(1000);
    expect(result, 'Объект при нулевой скидке').not.toBe(order);
  });

  it('скидка 100%: сумма ноль', () => {
    expect(applyDiscount(makeOrder(), 100).total, 'Полная скидка').toBe(0);
  });

  it('изменение результата не затрагивает оригинал', () => {
    const order = makeOrder();
    const result = applyDiscount(order, 0);
    result.status = 'cancelled';
    expect(order.status, 'Статус исходного заказа').toBe('new');
  });
});
