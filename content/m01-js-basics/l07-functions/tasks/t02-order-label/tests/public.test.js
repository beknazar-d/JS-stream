import { orderLabel } from './index.js';

describe('orderLabel', () => {
  it('дополняет номер нулями до четырёх цифр', () => {
    expect(orderLabel(42), 'Номер 42').toBe('Заказ №0042');
    expect(orderLabel(7), 'Номер 7').toBe('Заказ №0007');
  });

  it('длинный номер не обрезается', () => {
    expect(orderLabel(12345), 'Номер 12345').toBe('Заказ №12345');
  });
});
