import { applyPromo } from './index.js';

describe('applyPromo', () => {
  it('SALE10 с округлением', () => {
    expect(applyPromo(10000, 'SALE10'), 'SALE10 на 100 ₽').toBe(1000);
    expect(applyPromo(105, 'SALE10'), '10,5 копейки').toBe(11);
  });

  it('порог MINUS500', () => {
    expect(applyPromo(200000, 'MINUS500'), 'Ровно порог').toBe(50000);
    expect(() => applyPromo(199999, 'MINUS500'), 'На копейку ниже').toThrow('действует от 2 000 ₽');
  });

  it('пустой и неизвестный код', () => {
    expect(applyPromo(10000, ''), 'Пустой код').toBe(0);
    expect(() => applyPromo(10000, 'FREE'), 'Код FREE').toThrow('Неизвестный промокод: FREE');
  });
});
