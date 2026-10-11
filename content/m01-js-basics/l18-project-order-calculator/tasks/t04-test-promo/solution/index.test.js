import { applyPromo } from './index.js';

describe('Промокод SALE10', () => {
  it('даёт десять процентов', () => {
    expect(applyPromo(10000, 'SALE10'), 'SALE10 на 100 ₽').toBe(1000);
  });

  it('округляет половину копейки вверх', () => {
    expect(applyPromo(105, 'SALE10'), '10,5 копейки округляются до 11').toBe(11);
  });

  it('округляет меньше половины вниз', () => {
    expect(applyPromo(104, 'SALE10'), '10,4 копейки округляются до 10').toBe(10);
  });

  it('на нулевую сумму даёт ноль', () => {
    expect(applyPromo(0, 'SALE10'), 'SALE10 на 0').toBe(0);
  });
});

describe('Промокод MINUS500', () => {
  it('даёт 500 рублей для заказа от 2 000 рублей', () => {
    expect(applyPromo(200000, 'MINUS500'), 'Ровно на пороге').toBe(50000);
    expect(applyPromo(500000, 'MINUS500'), 'Крупный заказ').toBe(50000);
  });

  it('не действует на копейку ниже порога', () => {
    expect(() => applyPromo(199999, 'MINUS500'), 'Заказ 1 999,99 ₽').toThrow('Промокод MINUS500 действует от 2 000 ₽');
  });

  it('не действует на маленький заказ', () => {
    expect(() => applyPromo(100, 'MINUS500'), 'Заказ 1 ₽').toThrow('действует от 2 000 ₽');
  });
});

describe('Ввод промокода', () => {
  it('регистр и пробелы не важны', () => {
    expect(applyPromo(10000, 'sale10'), 'Строчные буквы').toBe(1000);
    expect(applyPromo(10000, '  Sale10 '), 'Пробелы и смешанный регистр').toBe(1000);
    expect(applyPromo(200000, ' minus500'), 'MINUS500 строчными').toBe(50000);
  });

  it('пустой промокод означает «без скидки»', () => {
    expect(applyPromo(10000, ''), 'Пустая строка').toBe(0);
    expect(applyPromo(10000, '   '), 'Одни пробелы').toBe(0);
    expect(applyPromo(10000, undefined), 'Промокод не передан').toBe(0);
  });

  it('неизвестный промокод — ошибка с текстом', () => {
    expect(() => applyPromo(10000, 'FREE'), 'Код FREE').toThrow('Неизвестный промокод: FREE');
    expect(() => applyPromo(10000, 'SALE1O'), 'Опечатка с буквой O').toThrow('Неизвестный промокод: SALE1O');
  });
});

describe('Сумма заказа', () => {
  it('отрицательная, дробная и нечисловая суммы — ошибка', () => {
    const message = 'Сумма должна быть целым неотрицательным числом копеек';
    expect(() => applyPromo(-1, 'SALE10'), 'Минус').toThrow(message);
    expect(() => applyPromo(10.5, 'SALE10'), 'Дробь').toThrow(message);
    expect(() => applyPromo('100', 'SALE10'), 'Строка').toThrow(message);
  });
});
