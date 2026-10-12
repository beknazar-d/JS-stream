import { cityOf } from './index.js';
import type { Order } from './index.js';

describe('cityOf: другие заказы', () => {
  it('заказ без квартиры и комментария', () => {
    const order: Order = { id: 1, customer: 'Пётр Лис', address: { city: 'Самара', street: 'Ленина 1' }, paid: true };
    expect(cityOf(order), 'Город заказа без квартиры').toBe('Самара');
  });
  it('заказ с комментарием', () => {
    const order: Order = { id: 2, customer: 'Ольга', address: { city: 'Пермь', street: 'Мира 9' }, paid: false, comment: 'позвонить' };
    expect(cityOf(order), 'Город заказа с комментарием').toBe('Пермь');
  });
});
