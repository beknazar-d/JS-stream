import { shippingCost } from './index.js';

describe('shippingCost: границы тарифа', () => {
  it('на единицу больше границы веса', () => {
    expect(shippingCost(4, 10), 'Вес 4 кг').toBe(240);
  });

  it('на единицу больше границы расстояния', () => {
    expect(shippingCost(1, 101), 'Расстояние 101 км').toBe(500);
  });

  it('нулевое расстояние допустимо', () => {
    expect(shippingCost(1, 0), 'Расстояние 0 км').toBe(200);
  });
});

describe('shippingCost: экспресс', () => {
  it('экспресс считается от итога со всеми доплатами', () => {
    expect(shippingCost(5, 250, true), 'Экспресс, вес 5 кг, 250 км').toBe(1160);
  });

  it('false равносильно отсутствию аргумента', () => {
    expect(shippingCost(5, 250, false), 'Явный false').toBe(shippingCost(5, 250));
  });

  it('обычная доставка возвращает число', () => {
    expect(shippingCost(2, 50), 'Тип результата без экспресса').toBeTypeOf('number');
  });
});

describe('shippingCost: некорректный ввод', () => {
  it('неподходящий вес', () => {
    expect(shippingCost(0, 10), 'Вес 0').toBeNull();
    expect(shippingCost(-2, 10), 'Отрицательный вес').toBeNull();
    expect(shippingCost(1.5, 10), 'Дробный вес').toBeNull();
    expect(shippingCost('3', 10), 'Вес строкой').toBeNull();
  });

  it('неподходящее расстояние', () => {
    expect(shippingCost(2, -5), 'Отрицательное расстояние').toBeNull();
    expect(shippingCost(2, NaN), 'Расстояние NaN').toBeNull();
    expect(shippingCost(2, '50'), 'Расстояние строкой').toBeNull();
    expect(shippingCost(2), 'Расстояние не передано').toBeNull();
  });
});

describe('shippingCost: чистота', () => {
  it('не печатает в консоль', () => {
    const original = console.log;
    console.log = fn();
    shippingCost(5, 250, true);
    const called = console.log.mock.calls.length;
    console.log = original;
    expect(called, 'Количество вызовов console.log').toBe(0);
  });
});
