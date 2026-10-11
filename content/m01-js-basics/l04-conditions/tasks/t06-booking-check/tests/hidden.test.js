import { validateBooking, bookingTotal } from './index.js';

describe('validateBooking: гости', () => {
  it('пустое, текстовое и дробное число гостей', () => {
    expect(validateBooking('', '3', 4, 5), 'Пустое поле гостей').toBe('Укажите число гостей');
    expect(validateBooking('abc', '3', 4, 5), 'Текст вместо гостей').toBe('Укажите число гостей');
    expect(validateBooking('1.5', '3', 4, 5), 'Полтора гостя').toBe('Укажите число гостей');
    expect(validateBooking(undefined, '3', 4, 5), 'Поле не передано').toBe('Укажите число гостей');
  });

  it('один гость и ровно вместимость допустимы', () => {
    expect(validateBooking('1', '3', 4, 5), 'Один гость').toBe('ok');
    expect(validateBooking('4', '3', 4, 5), 'Гостей ровно по вместимости').toBe('ok');
  });
});

describe('validateBooking: ночи', () => {
  it('границы 1 и 30 допустимы', () => {
    expect(validateBooking('2', '1', 4, 5), 'Одна ночь').toBe('ok');
    expect(validateBooking('2', '30', 4, 5), '30 ночей').toBe('ok');
  });

  it('0, дробные и текстовые ночи недопустимы', () => {
    expect(validateBooking('2', '0', 4, 5), '0 ночей').toBe('Срок проживания от 1 до 30 ночей');
    expect(validateBooking('2', '2.5', 4, 5), '2,5 ночи').toBe('Срок проживания от 1 до 30 ночей');
    expect(validateBooking('2', 'abc', 4, 5), 'Текст вместо ночей').toBe('Срок проживания от 1 до 30 ночей');
  });
});

describe('validateBooking: дата и приоритет ошибок', () => {
  it('заезд сегодня допустим', () => {
    expect(validateBooking('2', '3', 4, 0), 'Заезд сегодня').toBe('ok');
  });

  it('возвращается первая ошибка из списка', () => {
    expect(validateBooking('abc', '40', 4, -5), 'Гости, ночи и дата одновременно').toBe('Укажите число гостей');
    expect(validateBooking('2', '40', 1, -5), 'Ночи, вместимость и дата одновременно').toBe('Срок проживания от 1 до 30 ночей');
    expect(validateBooking('9', '3', 4, -5), 'Вместимость и дата одновременно').toBe('Максимум гостей: 4');
  });

  it('текст про вместимость подставляет число', () => {
    expect(validateBooking('3', '2', 2, 1), 'Вместимость 2').toBe('Максимум гостей: 2');
  });
});

describe('bookingTotal: скидки', () => {
  it('до 7 ночей скидки нет', () => {
    expect(bookingTotal(6, 100000), 'Шесть ночей').toBe(600000);
  });

  it('с 7 до 13 ночей скидка 10 процентов', () => {
    expect(bookingTotal(13, 100000), 'Тринадцать ночей').toBe(1170000);
  });

  it('с 14 ночей скидка 15 процентов', () => {
    expect(bookingTotal(14, 100000), 'Четырнадцать ночей').toBe(1190000);
    expect(bookingTotal(30, 100000), 'Тридцать ночей').toBe(2550000);
  });

  it('результат округляется до копейки', () => {
    expect(bookingTotal(7, 1999), 'Семь ночей по 19,99').toBe(12594);
  });

  it('одна ночь', () => {
    expect(bookingTotal(1, 250000), 'Одна ночь').toBe(250000);
  });
});
