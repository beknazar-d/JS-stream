import { monthsToPay } from './index.js';

describe('monthsToPay', () => {
  it('цена делится на платёж без остатка', () => {
    expect(monthsToPay(12000, 3000), '12 000 при платеже 3000').toBe(4);
  });

  it('последний платёж меньше остальных', () => {
    expect(monthsToPay(10000, 3000), '10 000 при платеже 3000').toBe(4);
  });

  it('платить нечего', () => {
    expect(monthsToPay(0, 500), 'Цена 0').toBe(0);
  });
});
