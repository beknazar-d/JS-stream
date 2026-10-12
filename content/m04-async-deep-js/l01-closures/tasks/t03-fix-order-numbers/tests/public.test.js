import { createNumbering } from './index.js';

describe('createNumbering', () => {
  it('первый номер', () => {
    const next = createNumbering('ORD');
    expect(next(), 'Первый номер заказа').toBe('ORD-0001');
  });

  it('номера растут', () => {
    const next = createNumbering('ORD');
    next();
    expect(next(), 'Второй номер').toBe('ORD-0002');
    expect(next(), 'Третий номер').toBe('ORD-0003');
  });
});
