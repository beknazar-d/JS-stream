import { sample, cityOf } from './index.js';

describe('Образец заказа', () => {
  it('образец не изменился', () => {
    expect(sample.id, 'Номер заказа').toBe(1042);
    expect(sample.customer, 'Клиент').toBe('Анна Соколова');
    expect(sample.address, 'Адрес').toEqual({ city: 'Казань', street: 'Баумана 5', apartment: 12 });
    expect(sample.paid, 'Оплата').toBe(false);
  });
  it('cityOf возвращает город', () => {
    expect(cityOf(sample), 'Город образца').toBe('Казань');
  });
});
