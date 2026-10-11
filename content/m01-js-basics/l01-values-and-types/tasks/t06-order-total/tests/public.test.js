import { calcOrderTotal } from './index.js';

describe('calcOrderTotal: примеры из тикета', () => {
  it('считает итог со скидкой в копейках', () => {
    const form = { price: '499.90', quantity: '3', discountPercent: '10' };
    expect(calcOrderTotal(form), 'Три штуки по 499,90 со скидкой 10 процентов: 1349,73 рубля').toBe(134973);
  });

  it('считает итог без скидки', () => {
    const form = { price: '250', quantity: '2', discountPercent: '' };
    expect(calcOrderTotal(form), 'Две штуки по 250 рублей, поле скидки пустое').toBe(50000);
  });

  it('некорректное количество даёт null', () => {
    const form = { price: '250', quantity: 'abc', discountPercent: '' };
    expect(calcOrderTotal(form), 'Количество "abc"').toBeNull();
  });
});
