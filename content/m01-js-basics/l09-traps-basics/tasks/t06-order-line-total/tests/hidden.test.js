import { orderLineTotal } from './index.js';

describe('orderLineTotal: скидка', () => {
  it('null, undefined и пробелы — не заполнено', () => {
    expect(orderLineTotal('1000', '2', null), 'Скидка null').toBe(1900);
    expect(orderLineTotal('1000', '2', undefined), 'Скидка undefined').toBe(1900);
    expect(orderLineTotal('1000', '2', '   '), 'Скидка из пробелов').toBe(1900);
  });

  it('число 0 вместо строки', () => {
    expect(orderLineTotal(1000, 2, 0), 'Скидка числом 0').toBe(2000);
  });

  it('граничные скидки', () => {
    expect(orderLineTotal('1000', '1', '100'), 'Скидка 100%').toBe(0);
    expect(orderLineTotal('1000', '1', '101'), 'Скидка 101%').toBeNull();
    expect(orderLineTotal('1000', '1', '-1'), 'Скидка -1%').toBeNull();
    expect(orderLineTotal('1000', '1', 'много'), 'Скидка текстом').toBeNull();
  });
});

describe('orderLineTotal: цена и количество', () => {
  it('пробелы и числа', () => {
    expect(orderLineTotal(' 1000 ', ' 2 ', ' 10 '), 'Поля с пробелами').toBe(1800);
  });

  it('плохая цена', () => {
    expect(orderLineTotal('', '2'), 'Пустая цена').toBeNull();
    expect(orderLineTotal('abc', '2'), 'Цена текстом').toBeNull();
    expect(orderLineTotal('0', '2'), 'Цена 0').toBeNull();
    expect(orderLineTotal(undefined, '2'), 'Цена не передана').toBeNull();
    expect(orderLineTotal(null, '2'), 'Цена null').toBeNull();
  });

  it('плохое количество', () => {
    expect(orderLineTotal('1000', ''), 'Пустое количество').toBeNull();
    expect(orderLineTotal('1000', '0'), 'Количество 0').toBeNull();
    expect(orderLineTotal('1000', '1.5'), 'Дробное количество').toBeNull();
    expect(orderLineTotal('1000', '2 шт'), 'Количество с единицами').toBeNull();
  });

  it('никогда не возвращает NaN', () => {
    const inputs = [['abc', 'x', 'y', 'z'], [undefined, undefined], ['', '', '', '']];
    for (const args of inputs) {
      expect(Number.isNaN(orderLineTotal(...args)), `Для ввода ${JSON.stringify(args)} вернулся NaN`).toBe(false);
    }
  });
});

describe('orderLineTotal: остаток', () => {
  it('не передан или null — без ограничения', () => {
    expect(orderLineTotal('10', '1000', '0'), 'Остаток не передан').toBe(10000);
    expect(orderLineTotal('10', '1000', '0', null), 'Остаток null').toBe(10000);
  });

  it('нулевой остаток', () => {
    expect(orderLineTotal('1000', '1', '0', '0'), 'Остаток «0»').toBeNull();
    expect(orderLineTotal('1000', '1', '0', 0), 'Остаток 0 числом').toBeNull();
  });

  it('плохой остаток', () => {
    expect(orderLineTotal('1000', '1', '0', ''), 'Пустой остаток').toBeNull();
    expect(orderLineTotal('1000', '1', '0', 'нет'), 'Остаток текстом').toBeNull();
    expect(orderLineTotal('1000', '1', '0', '-5'), 'Отрицательный остаток').toBeNull();
    expect(orderLineTotal('1000', '1', '0', '2.5'), 'Дробный остаток').toBeNull();
  });
});
