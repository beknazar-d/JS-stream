import { CURRENT_VERSION, migrate } from './schema.js';
import { exportCart, importCart } from './cart-file.js';
import { totalKopecks, roundTrip } from './index.js';

const v1 = (price) => JSON.stringify({ version: 1, lines: [{ sku: 'A', qty: 1, price }] });

describe('schema.js', () => {
  it('текущая версия — 2', () => {
    expect(CURRENT_VERSION, 'CURRENT_VERSION').toBe(2);
  });

  it('данные версии 2 не меняются', () => {
    const data = { version: 2, items: [] };
    expect(migrate(data), 'Версия 2 возвращается как есть').toBe(data);
  });

  it('версия 1 переводится в версию 2', () => {
    const data = { version: 1, lines: [{ sku: 'A', qty: 3, price: '10.00' }] };
    expect(migrate(data), 'Миграция версии 1').toEqual({ version: 2, items: [{ sku: 'A', qty: 3, priceKopecks: 1000 }] });
  });

  it('будущая версия не поддерживается', () => {
    expect(() => migrate({ version: 3, items: [] }), 'Версия 3').toThrow('Неподдерживаемая версия файла: 3');
  });

  it('данные без версии не похожи на корзину', () => {
    expect(() => migrate({ items: [] }), 'Нет version').toThrow('Файл не похож на корзину');
    expect(() => migrate(null), 'null').toThrow('Файл не похож на корзину');
    expect(() => migrate({ version: 1 }), 'Версия 1 без lines').toThrow('Файл не похож на корзину');
  });
});

describe('importCart: деньги', () => {
  it('19.99 рублей — это 1999 копеек', () => {
    expect(importCart(v1('19.99'))[0].priceKopecks, 'Цена «19.99» из версии 1').toBe(1999);
  });

  it('1.10 и 0.29 тоже переводятся точно', () => {
    expect(importCart(v1('1.10'))[0].priceKopecks, 'Цена «1.10»').toBe(110);
    expect(importCart(v1('0.29'))[0].priceKopecks, 'Цена «0.29»').toBe(29);
  });
});

describe('importCart: ошибки', () => {
  it('ошибка миграции доходит с собственным текстом', () => {
    expect(() => importCart('{"version":3,"items":[]}'), 'Файл версии 3').toThrow('Неподдерживаемая версия файла: 3');
  });

  it('JSON, но не корзина', () => {
    expect(() => importCart('null'), 'null').toThrow('Файл не похож на корзину');
    expect(() => importCart('[]'), 'Массив').toThrow('Файл не похож на корзину');
    expect(() => importCart('{"version":2}'), 'Версия 2 без items').toThrow('Файл не похож на корзину');
    expect(() => importCart('{"version":2,"items":5}'), 'items — число').toThrow('Файл не похож на корзину');
  });

  it('пустой текст', () => {
    expect(() => importCart(''), 'Пустой файл').toThrow('Файл повреждён: это не JSON');
  });

  it('некорректная позиция называется по номеру', () => {
    const text = JSON.stringify({
      version: 2,
      items: [
        { sku: 'A', qty: 1, priceKopecks: 100 },
        { sku: 'B', qty: 0, priceKopecks: 100 },
      ],
    });
    expect(() => importCart(text), 'Вторая позиция с количеством 0').toThrow('Позиция 2: некорректные данные');
  });

  it('проверяются все поля позиции', () => {
    const bad = [
      { sku: '', qty: 1, priceKopecks: 100 },
      { sku: 'A', qty: 1.5, priceKopecks: 100 },
      { sku: 'A', qty: '2', priceKopecks: 100 },
      { sku: 'A', qty: 1, priceKopecks: 10.5 },
      { sku: 'A', qty: 1, priceKopecks: -1 },
      null,
    ];
    for (const item of bad) {
      const text = JSON.stringify({ version: 2, items: [item] });
      expect(() => importCart(text), `Позиция ${JSON.stringify(item)}`).toThrow('Позиция 1: некорректные данные');
    }
  });

  it('нулевая цена допустима', () => {
    const text = JSON.stringify({ version: 2, items: [{ sku: 'GIFT', qty: 1, priceKopecks: 0 }] });
    expect(importCart(text), 'Подарок').toEqual([{ sku: 'GIFT', qty: 1, priceKopecks: 0 }]);
  });
});

describe('Экспорт и обратный путь', () => {
  const items = [{ sku: 'A-100', qty: 2, priceKopecks: 120050 }];

  it('текст записан с отступом в два пробела', () => {
    expect(exportCart(items), 'Текст файла').toBe(JSON.stringify({ version: 2, items }, null, 2));
  });

  it('лишние поля при чтении отбрасываются', () => {
    const text = JSON.stringify({ version: 2, items: [{ sku: 'A', qty: 1, priceKopecks: 5, note: 'x' }] });
    expect(importCart(text), 'Позиция с лишним полем').toEqual([{ sku: 'A', qty: 1, priceKopecks: 5 }]);
  });

  it('пустая корзина', () => {
    expect(roundTrip([]), 'Пустая корзина').toEqual([]);
    expect(totalKopecks([]), 'Итог пустой корзины').toBe(0);
  });

  it('исходные позиции не меняются', () => {
    roundTrip(items);
    expect(items, 'Исходный массив').toEqual([{ sku: 'A-100', qty: 2, priceKopecks: 120050 }]);
  });
});
