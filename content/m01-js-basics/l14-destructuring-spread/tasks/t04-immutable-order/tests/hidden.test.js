import { setStatus, addLine, changeCity } from './index.js';

const makeOrder = () => ({
  id: 1042,
  status: 'new',
  customer: { name: 'Анна Ким', address: { city: 'Казань', street: 'Баумана' } },
  lines: [{ sku: 'A-100', qty: 2 }, { sku: 'C-300', qty: 5 }],
});

describe('Исходный заказ не меняется', () => {
  it('setStatus', () => {
    const order = makeOrder();
    const result = setStatus(order, 'paid');
    expect(result, 'Результат — новый объект').not.toBe(order);
    expect(order, 'Исходный заказ после setStatus').toEqual(makeOrder());
  });

  it('addLine: новая позиция', () => {
    const order = makeOrder();
    const result = addLine(order, { sku: 'B-200', qty: 1 });
    expect(result.lines, 'Новый массив строк').not.toBe(order.lines);
    expect(order, 'Исходный заказ после addLine').toEqual(makeOrder());
  });

  it('addLine: существующая позиция', () => {
    const order = makeOrder();
    addLine(order, { sku: 'A-100', qty: 3 });
    expect(order, 'Количество в исходном заказе не изменилось').toEqual(makeOrder());
  });

  it('changeCity', () => {
    const order = makeOrder();
    const result = changeCity(order, 'Самара');
    expect(result.customer.address, 'Адрес — новый объект').not.toBe(order.customer.address);
    expect(order, 'Исходный заказ после changeCity').toEqual(makeOrder());
  });
});

describe('addLine: одинаковые sku', () => {
  it('суммирует количество и оставляет одну строку', () => {
    const result = addLine(makeOrder(), { sku: 'A-100', qty: 3 });
    expect(result.lines, 'Строки после добавления A-100 ещё 3 штуки').toEqual([{ sku: 'A-100', qty: 5 }, { sku: 'C-300', qty: 5 }]);
  });

  it('порядок строк сохраняется', () => {
    const result = addLine(makeOrder(), { sku: 'C-300', qty: 1 });
    expect(result.lines.map((line) => line.sku), 'Порядок sku').toEqual(['A-100', 'C-300']);
    expect(result.lines[1].qty, 'Количество C-300').toBe(6);
  });
});

describe('Остальные поля сохраняются', () => {
  it('setStatus не теряет клиента и строки', () => {
    const result = setStatus(makeOrder(), 'paid');
    expect(result, 'Весь заказ кроме статуса').toEqual({ ...makeOrder(), status: 'paid' });
  });

  it('changeCity не теряет статус и строки', () => {
    const result = changeCity(makeOrder(), 'Пермь');
    expect(result.status, 'Статус').toBe('new');
    expect(result.lines, 'Строки').toEqual(makeOrder().lines);
  });
});
