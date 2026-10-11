import { orderLabel } from './index.js';

describe('orderLabel: возвращаемое значение', () => {
  it('возвращает строку, а не undefined', () => {
    expect(orderLabel(1), 'Тип результата для номера 1').toBeTypeOf('string');
  });

  it('четырёхзначный номер без изменений', () => {
    expect(orderLabel(1042), 'Номер 1042').toBe('Заказ №1042');
  });
});
