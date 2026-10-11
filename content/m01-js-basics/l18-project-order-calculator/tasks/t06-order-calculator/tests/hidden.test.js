import { calculateOrder } from './index.js';
import { deliveryCost, FREE_DELIVERY_FROM, DELIVERY_PRICE } from './delivery.js';
import { vatIncluded } from './vat.js';
import { ValidationError } from './errors.js';

const line = (sku, price, qty) => ({ sku, name: `Товар ${sku}`, price, qty });

describe('delivery.js', () => {
  it('константы по ТЗ', () => {
    expect(FREE_DELIVERY_FROM, 'Порог бесплатной доставки').toBe(300000);
    expect(DELIVERY_PRICE, 'Цена доставки').toBe(29900);
  });

  it('граница порога', () => {
    expect(deliveryCost(299999), 'На копейку ниже порога').toBe(29900);
    expect(deliveryCost(300000), 'Ровно порог').toBe(0);
    expect(deliveryCost(300001), 'На копейку выше порога').toBe(0);
    expect(deliveryCost(0), 'Нулевая сумма').toBe(29900);
  });
});

describe('vat.js', () => {
  it('НДС 20%, входящий в сумму', () => {
    expect(vatIncluded(12000), '120 ₽ содержат 20 ₽ НДС').toBe(2000);
    expect(vatIncluded(0), 'Ноль').toBe(0);
  });

  it('округление до копейки по правилу «половина вверх»', () => {
    expect(vatIncluded(119999), '119999 × 20 / 120 = 19999,83').toBe(20000);
    expect(vatIncluded(3), '3 × 20 / 120 = 0,5').toBe(1);
    expect(vatIncluded(2), '2 × 20 / 120 = 0,33').toBe(0);
  });
});

describe('calculateOrder: доставка и граница', () => {
  it('2 999,99 ₽ и 3 000,00 ₽', () => {
    expect(calculateOrder([line('A', 299999, 1)], '').delivery, '2 999,99 ₽').toBe(29900);
    expect(calculateOrder([line('A', 300000, 1)], '').delivery, '3 000,00 ₽').toBe(0);
  });

  it('порог проверяется после скидок', () => {
    const result = calculateOrder([line('A', 300000, 1)], 'MINUS500');
    expect(result.goods, 'Товары после промокода').toBe(250000);
    expect(result.delivery, 'После скидки сумма ниже порога, доставка платная').toBe(29900);
    expect(result.total, 'Итог').toBe(279900);
  });

  it('скидка за количество может привести к платной доставке', () => {
    const result = calculateOrder([line('A', 31579, 10)], '');
    expect(result.subtotal, 'Сумма без скидок').toBe(315790);
    expect(result.volume, 'Скидка за количество 5%').toBe(15790);
    expect(result.goods, 'Товары после скидки').toBe(300000);
    expect(result.delivery, 'Ровно порог после скидки: доставка бесплатная').toBe(0);
  });
});

describe('calculateOrder: раскладка', () => {
  it('все слагаемые согласованы', () => {
    const cart = [line('A', 1999, 12), line('B', 4550, 3), line('C', 1, 1)];
    const r = calculateOrder(cart, 'sale10');
    expect(r.goods, 'goods = subtotal - volume - promo').toBe(r.subtotal - r.volume - r.promo);
    expect(r.total, 'total = goods + delivery').toBe(r.goods + r.delivery);
    expect(r.vat, 'НДС от итога').toBe(Math.round((r.total * 20) / 120));
    for (const key of ['subtotal', 'volume', 'promo', 'goods', 'delivery', 'vat', 'total']) {
      expect(Number.isInteger(r[key]), `Поле ${key} — целое число копеек`).toBe(true);
    }
  });

  it('точный пример со всеми скидками', () => {
    const cart = [line('A', 10000, 10), line('B', 2000, 20), line('C', 500, 1)];
    expect(calculateOrder(cart, 'SALE10'), 'Корзина 1 405 ₽ с SALE10').toMatchObject({
      subtotal: 140500,
      volume: 7000,
      promo: 13350,
      goods: 120150,
      delivery: 29900,
      total: 150050,
      vat: 25008,
    });
  });

  it('строки повторяют корзину по порядку', () => {
    const cart = [line('B', 100, 2), line('A', 50, 3)];
    const r = calculateOrder(cart, '');
    expect(r.lines.map((item) => [item.sku, item.total]), 'Порядок и суммы строк').toEqual([['B', 200], ['A', 150]]);
  });
});

describe('calculateOrder: ошибки и чистота', () => {
  it('корзина не массив', () => {
    expect(() => calculateOrder(undefined, ''), 'Корзина не передана').toThrow('Корзина пуста');
    expect(() => calculateOrder(null, ''), 'Корзина null').toThrow(ValidationError);
  });

  it('ошибки промокода пробрасываются', () => {
    expect(() => calculateOrder([line('A', 10000, 1)], 'FREE'), 'Неизвестный код').toThrow('Неизвестный промокод: FREE');
    expect(() => calculateOrder([line('A', 10000, 1)], 'MINUS500'), 'Заказ ниже порога MINUS500').toThrow('Промокод MINUS500 действует от 2 000 ₽');
  });

  it('промокод можно не передавать', () => {
    expect(calculateOrder([line('A', 10000, 1)]).promo, 'Промокод не передан').toBe(0);
  });

  it('корзина и результат независимы', () => {
    const cart = [line('A', 100000, 2)];
    const r = calculateOrder(cart, 'SALE10');
    expect(cart, 'Корзина после расчёта').toEqual([line('A', 100000, 2)]);
    r.lines[0].qty = 99;
    expect(cart[0].qty, 'Правка результата не меняет корзину').toBe(2);
  });
});
