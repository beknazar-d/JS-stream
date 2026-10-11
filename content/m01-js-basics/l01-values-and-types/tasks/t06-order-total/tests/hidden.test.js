import { calcOrderTotal } from './index.js';

const valid = { price: '100', quantity: '1', discountPercent: '0' };
const withField = (field, value) => ({ ...valid, [field]: value });

describe('calcOrderTotal: расчёт', () => {
  it('переводит рубли в копейки без потери точности', () => {
    const form = { price: '0.10', quantity: '3', discountPercent: '0' };
    expect(calcOrderTotal(form), 'Три штуки по 10 копеек').toBe(30);
  });

  it('копейки в цене не теряются', () => {
    const form = { price: '19.99', quantity: '3', discountPercent: '0' };
    expect(calcOrderTotal(form), 'Три штуки по 19,99').toBe(5997);
  });

  it('округляет итог до целой копейки', () => {
    const down = { price: '19.99', quantity: '3', discountPercent: '15' };
    expect(calcOrderTotal(down), '5997 копеек со скидкой 15 процентов, 5097,45 округляется вниз').toBe(5097);
    const up = { price: '10.01', quantity: '1', discountPercent: '7' };
    expect(calcOrderTotal(up), '1001 копейка со скидкой 7 процентов, 930,93 округляется вверх').toBe(931);
  });

  it('скидка 100 процентов даёт 0', () => {
    expect(calcOrderTotal(withField('discountPercent', '100')), 'Скидка 100 процентов').toBe(0);
  });

  it('пробелы по краям не мешают', () => {
    const form = { price: ' 100 ', quantity: ' 2 ', discountPercent: ' 50 ' };
    expect(calcOrderTotal(form), 'Все поля с пробелами по краям').toBe(10000);
  });

  it('большие суммы считаются точно', () => {
    const form = { price: '99999.99', quantity: '100', discountPercent: '50' };
    expect(calcOrderTotal(form), '100 штук по 99999,99 со скидкой 50 процентов').toBe(499999950);
  });

  it('результат — целое число', () => {
    const result = calcOrderTotal({ price: '9.99', quantity: '1', discountPercent: '33' });
    expect(result, 'Итог 669,33 копейки округляется до 669').toBe(669);
    expect(Number.isInteger(result), 'Итог должен быть целым числом копеек').toBe(true);
  });
});

describe('calcOrderTotal: скидка не заполнена', () => {
  it('пустая строка, пробелы и отсутствующее поле означают скидку 0', () => {
    expect(calcOrderTotal(withField('discountPercent', '')), 'Пустая скидка').toBe(10000);
    expect(calcOrderTotal(withField('discountPercent', '   ')), 'Скидка из пробелов').toBe(10000);
    expect(calcOrderTotal({ price: '100', quantity: '1' }), 'Поля скидки нет в форме').toBe(10000);
  });
});

describe('calcOrderTotal: некорректная цена', () => {
  for (const price of ['', '   ', '0', '-5', 'abc', '499,90', 'Infinity', '12 руб']) {
    it(`цена ${JSON.stringify(price)} даёт null`, () => {
      expect(calcOrderTotal(withField('price', price)), `Цена ${JSON.stringify(price)}`).toBeNull();
    });
  }

  it('цена не передана', () => {
    expect(calcOrderTotal({ quantity: '1', discountPercent: '0' }), 'В форме нет поля price').toBeNull();
  });
});

describe('calcOrderTotal: некорректное количество', () => {
  for (const quantity of ['', '   ', '0', '1.5', '-1', 'abc', '3abc']) {
    it(`количество ${JSON.stringify(quantity)} даёт null`, () => {
      expect(calcOrderTotal(withField('quantity', quantity)), `Количество ${JSON.stringify(quantity)}`).toBeNull();
    });
  }
});

describe('calcOrderTotal: некорректная скидка', () => {
  for (const discount of ['101', '-1', '10.5', 'abc', '10%']) {
    it(`скидка ${JSON.stringify(discount)} даёт null`, () => {
      expect(calcOrderTotal(withField('discountPercent', discount)), `Скидка ${JSON.stringify(discount)}`).toBeNull();
    });
  }
});

describe('calcOrderTotal: NaN никогда не возвращается', () => {
  it('для любого мусора результат не NaN', () => {
    const garbage = ['', ' ', 'abc', '1,5', 'NaN', undefined, null, '-', '.'];
    for (const price of garbage) {
      for (const quantity of garbage) {
        const result = calcOrderTotal({ price, quantity, discountPercent: 'abc' });
        expect(Number.isNaN(result), `Для price=${JSON.stringify(price)}, quantity=${JSON.stringify(quantity)} вернулся NaN`).toBe(false);
      }
    }
  });
});
