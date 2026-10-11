import { exportCart, importCart } from './cart-file.js';
import { totalKopecks, roundTrip } from './index.js';

const items = [
  { sku: 'A-100', qty: 2, priceKopecks: 120050 },
  { sku: 'B-200', qty: 1, priceKopecks: 30000 },
];

describe('exportCart', () => {
  it('записывает версию и позиции', () => {
    expect(JSON.parse(exportCart(items)), 'Содержимое файла').toEqual({ version: 2, items });
  });
});

describe('importCart', () => {
  it('читает файл версии 2', () => {
    expect(importCart(exportCart(items)), 'Файл, записанный exportCart').toEqual(items);
  });

  it('читает файл версии 1', () => {
    const text = '{"version":1,"lines":[{"sku":"A-100","qty":2,"price":"1200.50"}]}';
    expect(importCart(text), 'Старый файл с ценой в рублях').toEqual([{ sku: 'A-100', qty: 2, priceKopecks: 120050 }]);
  });

  it('сообщает о тексте, который не JSON', () => {
    expect(() => importCart('{"version":2,'), 'Обрезанный файл').toThrow('Файл повреждён: это не JSON');
  });
});

describe('index.js', () => {
  it('totalKopecks: сумма по позициям', () => {
    expect(totalKopecks(items), 'Итог корзины').toBe(270100);
  });

  it('roundTrip: ничего не теряется', () => {
    expect(roundTrip(items), 'Корзина после записи и чтения').toEqual(items);
  });
});
