import { validateOrder, ValidationError } from './index.js';

const goodOrder = () => ({ id: 1, lines: [{ sku: 'A-100', qty: 2, price: 1200 }] });

describe('validateOrder', () => {
  it('возвращает корректный заказ', () => {
    const order = goodOrder();
    expect(validateOrder(order), 'Корректный заказ').toBe(order);
  });

  it('заказ не передан', () => {
    expect(() => validateOrder(undefined), 'Заказ undefined').toThrow('Заказ не передан');
  });

  it('нет позиций', () => {
    expect(() => validateOrder({ id: 1, lines: [] }), 'Пустой список позиций').toThrow('В заказе нет позиций');
  });

  it('нулевое количество', () => {
    const order = { id: 1, lines: [{ sku: 'A-100', qty: 0, price: 1200 }] };
    expect(() => validateOrder(order), 'Количество 0').toThrow('Позиция A-100: количество должно быть целым числом больше нуля');
  });

  it('ошибка имеет свой тип', () => {
    expect(() => validateOrder(null), 'Заказ null').toThrow(ValidationError);
  });
});
