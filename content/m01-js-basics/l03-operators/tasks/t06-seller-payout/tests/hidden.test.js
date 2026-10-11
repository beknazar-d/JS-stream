import { sellerPayout, canPayOut } from './index.js';

describe('sellerPayout: значения по умолчанию', () => {
  it('аргументы не переданы вообще', () => {
    expect(sellerPayout(100000), 'Только выручка').toBe(90000);
  });

  it('премия не передана, комиссия задана', () => {
    expect(sellerPayout(100000, 20), 'Комиссия 20 процентов, премии нет').toBe(80000);
  });

  it('премия задана, комиссия не передана', () => {
    expect(sellerPayout(100000, undefined, 2500), 'Комиссия по умолчанию плюс премия 25 рублей').toBe(92500);
  });

  it('нулевая премия и undefined дают одно и то же', () => {
    expect(sellerPayout(50000, 10, undefined), 'Премия undefined').toBe(sellerPayout(50000, 10, 0));
  });
});

describe('sellerPayout: округление комиссии', () => {
  it('дробная комиссия округляется до копейки', () => {
    expect(sellerPayout(999, 2.5), 'Выручка 9,99 рубля, комиссия 2,5 процента').toBe(974);
  });

  it('результат всегда целое число', () => {
    expect(Number.isInteger(sellerPayout(12345, 7.5, 0)), 'Выплата 123,45 рубля при комиссии 7,5 процента').toBe(true);
  });

  it('комиссия 100 процентов оставляет только премию', () => {
    expect(sellerPayout(100000, 100, 3000), 'Вся выручка уходит площадке').toBe(3000);
  });
});

describe('canPayOut: запреты', () => {
  it('в выходной выплата запрещена', () => {
    expect(canPayOut(500000, true, false), 'Большая сумма, но выходной').toBe(false);
  });

  it('заблокированному продавцу выплата запрещена', () => {
    expect(canPayOut(500000, false, true), 'Большая сумма, но продавец заблокирован').toBe(false);
  });

  it('выходной и блокировка вместе', () => {
    expect(canPayOut(500000, true, true), 'Оба запрета').toBe(false);
  });

  it('большая выплата в рабочий день разрешена', () => {
    expect(canPayOut(500000, false, false), 'Пять тысяч рублей в будний день').toBe(true);
  });

  it('нулевая выплата запрещена', () => {
    expect(canPayOut(0, false, false), 'Нечего выплачивать').toBe(false);
  });
});
