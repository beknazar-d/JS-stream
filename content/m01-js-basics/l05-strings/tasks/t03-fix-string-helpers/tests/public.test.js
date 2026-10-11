import { cleanSku, compactPhone, orderLabel } from './index.js';

describe('cleanSku', () => {
  it('убирает пробелы слева и поднимает регистр', () => {
    expect(cleanSku(' rn-4521-blk'), 'Артикул с пробелом слева').toBe('RN-4521-BLK');
  });
});

describe('compactPhone', () => {
  it('убирает скобки, пробелы и дефисы', () => {
    expect(compactPhone('+7 (999) 123-45-67'), 'Телефон с форматированием').toBe('+79991234567');
  });
});

describe('orderLabel', () => {
  it('подставляет номер в подпись', () => {
    expect(orderLabel(42), 'Заказ 42').toBe('Заказ №42');
  });
});
