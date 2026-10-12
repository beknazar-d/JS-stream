import { applyPatch, previewOf, type Order } from './index.js';

const order: Order = { id: 5, createdAt: '2025-03-01T10:00:00Z', status: 'paid', city: 'Тверь', total: 100, items: [] };

describe('виды заказа: детали', () => {
  it('превью — новый объект', () => {
    const preview = previewOf(order);
    expect(preview, 'Превью не должно быть исходным заказом').not.toBe(order);
    expect(Object.keys(preview), 'Список полей превью').toEqual(['id', 'status']);
  });

  it('патч не меняет исходный заказ', () => {
    applyPatch(order, { city: 'Омск', total: 1 });
    expect(order.city, 'Город исходного заказа').toBe('Тверь');
  });

  it('пустой патч возвращает копию заказа', () => {
    expect(applyPatch(order, {}), 'Пустой патч').toEqual(order);
  });
});
