import { updateOrder, type Order } from './index.js';

const order: Order = { id: 7, status: 'paid', city: 'Тверь', total: 100 };

describe('updateOrder: детали', () => {
  it('пропускает поля со значением undefined', () => {
    expect(updateOrder(order, { city: undefined, total: 250 }), 'city: undefined не затирает город').toEqual({ id: 7, status: 'paid', city: 'Тверь', total: 250 });
  });

  it('сумма 0 — допустимое значение', () => {
    expect(updateOrder(order, { total: 0 }).total, 'Обнуление суммы').toBe(0);
  });

  it('результат не делит ссылки с патчем', () => {
    const patch = { status: 'delivered' as const };
    const result = updateOrder(order, patch);
    patch.status = 'delivered';
    expect(result.status, 'Статус результата').toBe('delivered');
    expect(Object.keys(result).sort(), 'Список полей результата').toEqual(['city', 'id', 'status', 'total']);
  });
});
