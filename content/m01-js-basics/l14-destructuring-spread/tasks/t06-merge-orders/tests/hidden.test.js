import { mergeOrders } from './index.js';

const make = (id, lines, extra = {}) => ({ id, status: 'new', lines, ...extra });
const line = (sku, qty, price = 100) => ({ sku, name: `Товар ${sku}`, price, qty });

describe('Сколько заказов передали', () => {
  it('без дополнительных заказов возвращает копию с пустым mergedFrom', () => {
    const a = make(1, [line('A', 1)]);
    const result = mergeOrders(a);
    expect(result, 'Один заказ').toEqual({ ...a, mergedFrom: [] });
    expect(result, 'Результат — новый объект').not.toBe(a);
  });

  it('объединяет три и более дополнительных заказа', () => {
    const result = mergeOrders(make(1, [line('A', 1)]), make(2, [line('B', 1)]), make(3, [line('A', 2)]), make(4, [line('C', 4)]));
    expect(result.lines.map((item) => [item.sku, item.qty]), 'Позиции после четырёх заказов').toEqual([['A', 3], ['B', 1], ['C', 4]]);
    expect(result.mergedFrom, 'Номера присоединённых заказов').toEqual([2, 3, 4]);
  });
});

describe('Правила слияния позиций', () => {
  it('название и цена берутся из первой встреченной строки', () => {
    const a = make(1, [{ sku: 'A', name: 'Чай', price: 100, qty: 1 }]);
    const b = make(2, [{ sku: 'A', name: 'Чай (новая цена)', price: 150, qty: 2 }]);
    expect(mergeOrders(a, b).lines, 'Строка A').toEqual([{ sku: 'A', name: 'Чай', price: 100, qty: 3 }]);
  });

  it('порядок позиций: по первому появлению', () => {
    const a = make(1, [line('B', 1), line('A', 1)]);
    const b = make(2, [line('C', 1), line('A', 1)]);
    expect(mergeOrders(a, b).lines.map((item) => item.sku), 'Порядок sku').toEqual(['B', 'A', 'C']);
  });

  it('одинаковый товар внутри одного дополнительного заказа тоже складывается', () => {
    const a = make(1, [line('A', 1)]);
    const b = make(2, [line('B', 1), line('B', 2)]);
    expect(mergeOrders(a, b).lines.find((item) => item.sku === 'B').qty, 'B дважды в одном заказе').toBe(3);
  });
});

describe('Исходные заказы не меняются', () => {
  it('ни основной, ни дополнительные заказы не изменились', () => {
    const makeAll = () => [make(1, [line('A', 1), line('B', 2)]), make(2, [line('A', 5)]), make(3, [line('B', 7), line('C', 1)])];
    const [a, b, c] = makeAll();
    mergeOrders(a, b, c);
    const [a0, b0, c0] = makeAll();
    expect(a, 'Основной заказ').toEqual(a0);
    expect(b, 'Второй заказ').toEqual(b0);
    expect(c, 'Третий заказ').toEqual(c0);
  });

  it('строки результата не совпадают по ссылке со строками исходных заказов', () => {
    const a = make(1, [line('A', 1)]);
    const b = make(2, [line('B', 1)]);
    const result = mergeOrders(a, b);
    expect(result.lines[0], 'Строка из основного заказа').not.toBe(a.lines[0]);
    expect(result.lines[1], 'Строка из дополнительного заказа').not.toBe(b.lines[0]);
  });
});

describe('Поля основного заказа', () => {
  it('статус и прочие поля сохраняются', () => {
    const a = make(1, [line('A', 1)], { status: 'paid', customer: 'Анна Ким' });
    const result = mergeOrders(a, make(2, [line('B', 1)], { status: 'new' }));
    expect(result.status, 'Статус основного заказа').toBe('paid');
    expect(result.customer, 'Клиент').toBe('Анна Ким');
    expect(result.id, 'Номер основного заказа').toBe(1);
  });
});
