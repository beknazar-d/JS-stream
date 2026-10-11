import { applyDiscount, shippingFor, checkoutTotal } from './index.js';

describe('applyDiscount: границы', () => {
  it('скидка 100% и 0%', () => {
    expect(applyDiscount(500, 100), 'Скидка 100%').toBe(0);
    expect(applyDiscount(500, 0), 'Скидка 0% передана явно').toBe(500);
  });

  it('дробный результат', () => {
    expect(applyDiscount(999, 15), 'Скидка 15% с 999').toBeCloseTo(849.15, 2);
  });
});

describe('shippingFor: границы', () => {
  it('ноль и копейка до границы', () => {
    expect(shippingFor(0), 'Сумма 0').toBe(350);
    expect(shippingFor(4999.99), 'Сумма 4999.99').toBe(350);
  });
});

describe('checkoutTotal: данные из формы', () => {
  it('пробелы по краям и числа вместо строк', () => {
    expect(checkoutTotal(' 1200 ', ' 2 '), 'Строки с пробелами').toBe(2750);
    expect(checkoutTotal(1200, 2), 'Числа вместо строк').toBe(2750);
  });

  it('нулевой купон равносилен отсутствию купона', () => {
    expect(checkoutTotal('1200', '2', 0), 'Купон 0%').toBe(2750);
  });

  it('дробная цена и скидка', () => {
    expect(checkoutTotal('999', '3', 15), 'Три штуки по 999 с купоном 15%').toBeCloseTo(2897.45, 2);
  });

  it('купон 100% оставляет только доставку', () => {
    expect(checkoutTotal('800', '1', 100), 'Купон 100%').toBe(350);
  });
});

describe('checkoutTotal: некорректный ввод даёт null', () => {
  it('цена', () => {
    expect(checkoutTotal('', '2'), 'Пустая цена').toBeNull();
    expect(checkoutTotal('abc', '2'), 'Цена текстом').toBeNull();
    expect(checkoutTotal('0', '2'), 'Цена 0').toBeNull();
    expect(checkoutTotal('-100', '2'), 'Отрицательная цена').toBeNull();
    expect(checkoutTotal('12 руб', '1'), 'Цена с единицами').toBeNull();
  });

  it('количество', () => {
    expect(checkoutTotal('1200', ''), 'Пустое количество').toBeNull();
    expect(checkoutTotal('1200', '0'), 'Количество 0').toBeNull();
    expect(checkoutTotal('1200', '1.5'), 'Дробное количество').toBeNull();
    expect(checkoutTotal('1200', '2 шт'), 'Количество с единицами').toBeNull();
  });

  it('купон', () => {
    expect(checkoutTotal('1200', '2', -5), 'Отрицательный процент').toBeNull();
    expect(checkoutTotal('1200', '2', 101), 'Процент больше 100').toBeNull();
    expect(checkoutTotal('1200', '2', NaN), 'Процент NaN').toBeNull();
    expect(checkoutTotal('1200', '2', '10'), 'Процент строкой').toBeNull();
  });

  it('никогда не возвращает NaN', () => {
    const inputs = [['', ''], ['abc', 'x'], [undefined, undefined], [null, null]];
    for (const [price, quantity] of inputs) {
      expect(Number.isNaN(checkoutTotal(price, quantity)), `Для ввода ${JSON.stringify([price, quantity])} вернулся NaN`).toBe(false);
    }
  });
});

describe('Чистота', () => {
  it('функции не печатают в консоль', () => {
    const original = console.log;
    console.log = fn();
    applyDiscount(100, 10);
    shippingFor(100);
    checkoutTotal('100', '1', 5);
    const called = console.log.mock.calls.length;
    console.log = original;
    expect(called, 'Количество вызовов console.log').toBe(0);
  });
});
