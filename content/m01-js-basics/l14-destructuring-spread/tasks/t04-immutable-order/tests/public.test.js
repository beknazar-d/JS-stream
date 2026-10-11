import { setStatus, addLine, changeCity } from './index.js';

const makeOrder = () => ({
  id: 1042,
  status: 'new',
  customer: { name: 'Анна Ким', address: { city: 'Казань', street: 'Баумана' } },
  lines: [{ sku: 'A-100', qty: 2 }],
});

describe('setStatus', () => {
  it('возвращает заказ с новым статусом', () => {
    const result = setStatus(makeOrder(), 'paid');
    expect(result.status, 'Новый статус').toBe('paid');
    expect(result.id, 'Остальные поля сохранены').toBe(1042);
  });
});

describe('addLine', () => {
  it('добавляет новую позицию в конец', () => {
    const result = addLine(makeOrder(), { sku: 'B-200', qty: 1 });
    expect(result.lines, 'Строки заказа').toEqual([{ sku: 'A-100', qty: 2 }, { sku: 'B-200', qty: 1 }]);
  });
});

describe('changeCity', () => {
  it('меняет город и сохраняет улицу и имя', () => {
    const result = changeCity(makeOrder(), 'Самара');
    expect(result.customer.address, 'Адрес в новом заказе').toEqual({ city: 'Самара', street: 'Баумана' });
    expect(result.customer.name, 'Имя клиента').toBe('Анна Ким');
  });
});
