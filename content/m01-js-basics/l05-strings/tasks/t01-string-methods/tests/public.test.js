import { normalizeSku, orderLabel, isRussianPhone, orderYear } from './index.js';

describe('normalizeSku', () => {
  it('убирает пробелы и поднимает регистр', () => {
    expect(normalizeSku(' rn-4521-blk '), 'Артикул с пробелами и строчными буквами').toBe('RN-4521-BLK');
  });

  it('чистый артикул не меняется', () => {
    expect(normalizeSku('RN-4521-BLK'), 'Уже чистый артикул').toBe('RN-4521-BLK');
  });
});

describe('orderLabel', () => {
  it('дополняет номер нулями до шести символов', () => {
    expect(orderLabel(42), 'Заказ 42').toBe('№000042');
  });

  it('длинный номер не обрезается', () => {
    expect(orderLabel(123456), 'Заказ 123456').toBe('№123456');
  });
});

describe('isRussianPhone', () => {
  it('российский телефон', () => {
    expect(isRussianPhone('+79991234567'), 'Номер +7').toBe(true);
  });

  it('иностранный телефон', () => {
    expect(isRussianPhone('+13105550123'), 'Номер +1').toBe(false);
  });
});

describe('orderYear', () => {
  it('достаёт год из номера заказа', () => {
    expect(orderYear('ORD-2024-0042'), 'Номер ORD-2024-0042').toBe('2024');
  });
});
