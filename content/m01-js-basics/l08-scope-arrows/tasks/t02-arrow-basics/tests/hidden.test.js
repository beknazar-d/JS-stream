import { toRubles, orderTotal, freeShipping } from './index.js';

describe('Это стрелочные функции', () => {
  it('у стрелочных функций нет свойства prototype', () => {
    expect('prototype' in toRubles, 'toRubles записана через function, а нужна стрелка').toBe(false);
    expect('prototype' in orderTotal, 'orderTotal записана через function, а нужна стрелка').toBe(false);
    expect('prototype' in freeShipping, 'freeShipping записана через function, а нужна стрелка').toBe(false);
  });
});

describe('Результаты', () => {
  it('toRubles сохраняет копейки', () => {
    expect(toRubles(1), 'Одна копейка').toBeCloseTo(0.01, 2);
    expect(toRubles(0), 'Ноль копеек').toBe(0);
  });

  it('orderTotal с нулём', () => {
    expect(orderTotal(300, 0), 'Ноль штук').toBe(0);
  });

  it('все функции возвращают число', () => {
    expect(orderTotal(10, 2), 'Тип orderTotal').toBeTypeOf('number');
    expect(freeShipping(), 'Тип freeShipping').toBeTypeOf('number');
  });
});
