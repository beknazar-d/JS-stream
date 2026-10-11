import { applyPromo } from './index.js';

describe('applyPromo', () => {
  it('SALE10', () => {
    expect(applyPromo(10000, 'SALE10'), 'SALE10 на 100 ₽').toBe(1000);
  });

  it('MINUS500', () => {
    expect(applyPromo(500000, 'MINUS500'), 'MINUS500 на 5 000 ₽').toBe(50000);
  });

  it('пустой и неизвестный код', () => {
    expect(applyPromo(10000, ''), 'Пустой код').toBe(0);
    expect(() => applyPromo(10000, 'FREE'), 'Код FREE').toThrow('Неизвестный промокод: FREE');
  });
});
