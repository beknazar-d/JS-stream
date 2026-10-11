import { createOrderCounter } from './index.js';

describe('createOrderCounter: независимость', () => {
  it('два счётчика не мешают друг другу', () => {
    const web = createOrderCounter(1000);
    const shop = createOrderCounter(5000);
    expect(web(), 'Онлайн, первый').toBe(1000);
    expect(shop(), 'Касса, первый').toBe(5000);
    expect(web(), 'Онлайн, второй').toBe(1001);
    expect(web(), 'Онлайн, третий').toBe(1002);
    expect(shop(), 'Касса, второй').toBe(5001);
  });

  it('счётчик, созданный позже, не сбрасывает ранний', () => {
    const first = createOrderCounter(10);
    first();
    first();
    createOrderCounter(500);
    expect(first(), 'Третий вызов первого счётчика').toBe(12);
  });
});

describe('createOrderCounter: свойства функции', () => {
  it('возвращает функцию, а не число', () => {
    expect(createOrderCounter(1), 'Тип результата createOrderCounter').toBeTypeOf('function');
  });

  it('возвращённая функция стрелочная', () => {
    expect('prototype' in createOrderCounter(1), 'Возвращаемая функция записана через function, а нужна стрелка').toBe(false);
  });

  it('начало с нуля и большое число', () => {
    const zero = createOrderCounter(0);
    expect(zero(), 'Старт с нуля').toBe(0);
    expect(zero(), 'После нуля').toBe(1);
    const big = createOrderCounter(999999);
    big();
    expect(big(), 'Переход через шестизначное число').toBe(1000000);
  });

  it('не печатает в консоль', () => {
    const original = console.log;
    console.log = fn();
    const next = createOrderCounter(1);
    next();
    const called = console.log.mock.calls.length;
    console.log = original;
    expect(called, 'Количество вызовов console.log').toBe(0);
  });
});
