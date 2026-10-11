import { applyCoupon } from './index.js';

describe('applyCoupon: скидки', () => {
  it('SALE10 снимает десять процентов', () => {
    expect(applyCoupon(1000, 'SALE10'), 'SALE10 на 1000').toBe(900);
  });

  it('SALE10 округляет до целого рубля', () => {
    expect(applyCoupon(995, 'SALE10'), 'SALE10 на 995: 895,5 округляется до 896').toBe(896);
  });

  it('MINUS500 вычитает 500 рублей', () => {
    expect(applyCoupon(1000, 'MINUS500'), 'MINUS500 на 1000').toBe(500);
  });

  it('MINUS500 не уводит сумму ниже нуля', () => {
    expect(applyCoupon(300, 'MINUS500'), 'MINUS500 на 300').toBe(0);
    expect(applyCoupon(500, 'MINUS500'), 'MINUS500 ровно на 500').toBe(0);
  });
});

describe('applyCoupon: неизвестный промокод', () => {
  it('отказывает на опечатку', () => {
    expect(() => applyCoupon(1000, 'SALE1O'), 'Код с буквой O вместо нуля').toThrow('Неизвестный промокод: SALE1O');
  });

  it('отказывает на пустой код и на undefined', () => {
    expect(() => applyCoupon(1000, ''), 'Пустой код').toThrow('Неизвестный промокод');
    expect(() => applyCoupon(1000, undefined), 'Код не передан').toThrow('Неизвестный промокод');
  });

  it('регистр важен', () => {
    expect(() => applyCoupon(1000, 'sale10'), 'Код в нижнем регистре').toThrow('Неизвестный промокод');
  });
});

describe('applyCoupon: плохая сумма', () => {
  it('отрицательная сумма', () => {
    expect(() => applyCoupon(-1, 'SALE10'), 'Сумма -1').toThrow('Сумма заказа должна быть неотрицательным числом');
  });

  it('сумма-строка и NaN', () => {
    expect(() => applyCoupon('1000', 'SALE10'), 'Сумма «1000» строкой').toThrow('Сумма заказа должна быть неотрицательным числом');
    expect(() => applyCoupon(NaN, 'SALE10'), 'Сумма NaN').toThrow('Сумма заказа должна быть неотрицательным числом');
  });

  it('нулевая сумма допустима', () => {
    expect(applyCoupon(0, 'SALE10'), 'Сумма 0').toBe(0);
  });
});
