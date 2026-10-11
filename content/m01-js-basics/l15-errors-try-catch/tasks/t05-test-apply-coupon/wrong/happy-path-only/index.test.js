import { applyCoupon } from './index.js';

describe('applyCoupon', () => {
  it('SALE10 на 1000', () => {
    expect(applyCoupon(1000, 'SALE10'), 'SALE10 на 1000').toBe(900);
  });

  it('MINUS500 на 1000', () => {
    expect(applyCoupon(1000, 'MINUS500'), 'MINUS500 на 1000').toBe(500);
  });
});
