import { parseQuantity } from './index.js';

describe('parseQuantity: допустимые значения', () => {
  it('ноль допустим', () => {
    expect(parseQuantity('0'), 'Поле "0" убирает товар из корзины').toBe(0);
  });

  it('ведущие нули допустимы', () => {
    expect(parseQuantity('007'), 'Поле "007"').toBe(7);
  });

  it('результат имеет тип number', () => {
    expect(parseQuantity('15'), 'Тип результата для "15"').toBeTypeOf('number');
  });

  it('большое число', () => {
    expect(parseQuantity('1000'), 'Поле "1000"').toBe(1000);
  });
});

describe('parseQuantity: пустой ввод', () => {
  it('строка из пробелов даёт null', () => {
    expect(parseQuantity('   '), 'Поле из одних пробелов').toBeNull();
  });
});

describe('parseQuantity: посторонние символы', () => {
  it('число с хвостом из букв даёт null', () => {
    expect(parseQuantity('3abc'), 'Поле "3abc"').toBeNull();
    expect(parseQuantity('12 шт'), 'Поле "12 шт"').toBeNull();
  });

  it('два числа через пробел дают null', () => {
    expect(parseQuantity('1 2'), 'Поле "1 2"').toBeNull();
  });
});

describe('parseQuantity: дробные и отрицательные', () => {
  it('дробное число даёт null', () => {
    expect(parseQuantity('2.5'), 'Поле "2.5"').toBeNull();
  });

  it('запятая как разделитель не поддерживается', () => {
    expect(parseQuantity('2,5'), 'Поле "2,5"').toBeNull();
  });

  it('отрицательное число даёт null', () => {
    expect(parseQuantity('-3'), 'Поле "-3"').toBeNull();
  });

  it('бесконечность не является количеством', () => {
    expect(parseQuantity('Infinity'), 'Поле "Infinity"').toBeNull();
  });
});

describe('parseQuantity: не строка', () => {
  it('null и undefined дают null', () => {
    expect(parseQuantity(null), 'Поле не пришло: null').toBeNull();
    expect(parseQuantity(undefined), 'Поле не пришло: undefined').toBeNull();
  });

  it('число вместо строки даёт null', () => {
    expect(parseQuantity(5), 'Пришло число 5, а не строка').toBeNull();
  });

  it('объект даёт null', () => {
    expect(parseQuantity({}), 'Пришёл пустой объект').toBeNull();
  });

  it('никогда не возвращает NaN', () => {
    const inputs = ['abc', '', ' ', '1,5', 'NaN', undefined, null];
    for (const input of inputs) {
      expect(Number.isNaN(parseQuantity(input)), `Для ввода ${JSON.stringify(input)} вернулся NaN`).toBe(false);
    }
  });
});
