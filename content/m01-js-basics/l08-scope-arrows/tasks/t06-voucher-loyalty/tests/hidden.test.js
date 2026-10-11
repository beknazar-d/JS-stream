import { createVoucherIssuer, createLoyaltyCalculator } from './index.js';

describe('createVoucherIssuer: независимость', () => {
  it('кампании не влияют друг на друга', () => {
    const winter = createVoucherIssuer('WINTER');
    const spring = createVoucherIssuer('SPRING', 100);
    expect(winter(), 'Зима, первый').toBe('WINTER-0001');
    expect(spring(), 'Весна, первый').toBe('SPRING-0100');
    expect(winter(), 'Зима, второй').toBe('WINTER-0002');
    expect(spring(), 'Весна, второй').toBe('SPRING-0101');
  });

  it('новая кампания не сбрасывает старую', () => {
    const first = createVoucherIssuer('A');
    first();
    first();
    createVoucherIssuer('B');
    expect(first(), 'Третий код первой кампании').toBe('A-0003');
  });
});

describe('createVoucherIssuer: формат', () => {
  it('длинный номер не обрезается', () => {
    const issue = createVoucherIssuer('BIG', 12345);
    expect(issue(), 'Пятизначный номер').toBe('BIG-12345');
  });

  it('переход через границу разряда', () => {
    const issue = createVoucherIssuer('X', 9999);
    expect(issue(), 'Последний четырёхзначный').toBe('X-9999');
    expect(issue(), 'Первый пятизначный').toBe('X-10000');
  });
});

describe('createLoyaltyCalculator: данные из формы', () => {
  const calculate = createLoyaltyCalculator(5000, 10);

  it('пробелы и числа', () => {
    expect(calculate(' 6000 '), 'Пробелы по краям').toBe(5400);
    expect(calculate(6000), 'Число вместо строки').toBe(5400);
  });

  it('разные кампании настраиваются независимо', () => {
    const small = createLoyaltyCalculator(1000, 50);
    expect(small('2000'), 'Скидка 50% от 1000').toBe(1000);
    expect(calculate('2000'), 'Старая кампания не изменилась').toBe(2000);
  });

  it('дробные суммы', () => {
    expect(calculate('5000.5'), 'Копейки').toBeCloseTo(4500.45, 2);
  });
});

describe('createLoyaltyCalculator: некорректный ввод', () => {
  const calculate = createLoyaltyCalculator(5000, 10);

  it('пустое поле, ноль и минус', () => {
    expect(calculate(''), 'Пустое поле').toBeNull();
    expect(calculate('   '), 'Поле из пробелов').toBeNull();
    expect(calculate('0'), 'Ноль').toBeNull();
    expect(calculate('-100'), 'Отрицательная сумма').toBeNull();
  });

  it('текст и NaN', () => {
    expect(calculate('abc'), 'Текст').toBeNull();
    expect(calculate('5000 руб'), 'Число с единицами').toBeNull();
    expect(calculate(NaN), 'NaN').toBeNull();
  });
});

describe('Стрелочные функции', () => {
  it('все четыре функции записаны стрелками', () => {
    expect('prototype' in createVoucherIssuer, 'createVoucherIssuer записана через function').toBe(false);
    expect('prototype' in createLoyaltyCalculator, 'createLoyaltyCalculator записана через function').toBe(false);
    expect('prototype' in createVoucherIssuer('X'), 'Выдаватель записан через function').toBe(false);
    expect('prototype' in createLoyaltyCalculator(1, 1), 'Калькулятор записан через function').toBe(false);
  });
});

describe('Чистота', () => {
  it('ничего не печатают в консоль', () => {
    const original = console.log;
    console.log = fn();
    createVoucherIssuer('Z')();
    createLoyaltyCalculator(100, 5)('200');
    const called = console.log.mock.calls.length;
    console.log = original;
    expect(called, 'Количество вызовов console.log').toBe(0);
  });
});
