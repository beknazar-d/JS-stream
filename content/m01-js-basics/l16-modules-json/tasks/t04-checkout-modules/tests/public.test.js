import { quote } from './index.js';

const stock = { 'A-100': 20, 'B-200': 2 };
const prices = { 'A-100': 1200, 'B-200': 300 };

describe('quote', () => {
  it('считает позицию со скидкой за количество', () => {
    const result = quote([{ sku: 'A-100', qty: 5 }], stock, prices);
    expect(result, '5 штук A-100, скидка 5%').toEqual({ lines: [{ sku: 'A-100', qty: 5, ok: true, total: 5700 }], total: 5700 });
  });

  it('помечает позицию без остатка', () => {
    const result = quote([{ sku: 'B-200', qty: 3 }], stock, prices);
    expect(result, 'Заказ 3 штуки при остатке 2').toEqual({ lines: [{ sku: 'B-200', qty: 3, ok: false, total: 0 }], total: 0 });
  });
});
