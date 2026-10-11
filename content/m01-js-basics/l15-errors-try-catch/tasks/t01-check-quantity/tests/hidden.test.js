import { checkQuantity, tryQuantity } from './index.js';

describe('checkQuantity: плохие значения', () => {
  it('отрицательное число', () => {
    expect(() => checkQuantity(-2), 'Количество -2').toThrow('Количество должно быть целым числом больше нуля');
  });

  it('дробное число', () => {
    expect(() => checkQuantity(1.5), 'Количество 1.5').toThrow('Количество должно быть целым числом больше нуля');
  });

  it('строка и NaN', () => {
    expect(() => checkQuantity('3'), 'Строка «3»').toThrow(Error);
    expect(() => checkQuantity(NaN), 'NaN').toThrow(Error);
  });
});

describe('tryQuantity: данные формы', () => {
  it('пустое поле', () => {
    expect(tryQuantity('').ok, 'Пустая строка не должна превращаться в хорошее количество').toBe(false);
  });

  it('дробь в строке', () => {
    expect(tryQuantity('2.5').ok, 'Строка «2.5»').toBe(false);
  });

  it('пробелы вокруг числа', () => {
    expect(tryQuantity(' 7 '), 'Строка « 7 »').toEqual({ ok: true, value: 7 });
  });

  it('ошибка не выбрасывается наружу', () => {
    expect(() => tryQuantity('abc'), 'Вызов tryQuantity с плохой строкой').not.toThrow();
  });
});
