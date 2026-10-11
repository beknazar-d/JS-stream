import { validateOrder, ValidationError } from './index.js';

const withLine = (line) => ({ id: 1, lines: [{ sku: 'B-200', qty: 1, price: 100 }, line] });
const capture = (fn) => {
  try {
    fn();
  } catch (error) {
    return error;
  }
  return undefined;
};

describe('Вид ошибки', () => {
  it('имя и наследование', () => {
    const error = capture(() => validateOrder(null));
    expect(error, 'validateOrder(null) должна выбросить ошибку').toBeDefined();
    expect(error.name, 'Имя ошибки').toBe('ValidationError');
    expect(error, 'Ошибка наследует от Error').toBeInstanceOf(Error);
    expect(error, 'Ошибка — экземпляр ValidationError').toBeInstanceOf(ValidationError);
  });

  it('lines не массив', () => {
    expect(() => validateOrder({ id: 1, lines: 'A-100' }), 'lines — строка').toThrow('В заказе нет позиций');
    expect(() => validateOrder({ id: 1 }), 'lines отсутствует').toThrow('В заказе нет позиций');
  });
});

describe('Количество', () => {
  const message = 'Позиция C-1: количество должно быть целым числом больше нуля';
  for (const [title, qty] of [['отрицательное', -1], ['дробное', 1.5], ['строка', '2'], ['NaN', NaN], ['не передано', undefined]]) {
    it(`отклоняет: ${title}`, () => {
      expect(() => validateOrder(withLine({ sku: 'C-1', qty, price: 10 })), `Количество: ${String(qty)}`).toThrow(message);
    });
  }
});

describe('Цена', () => {
  const message = 'Позиция C-1: цена должна быть неотрицательным числом';
  for (const [title, price] of [['отрицательная', -5], ['NaN', NaN], ['бесконечность', Infinity], ['строка', '100'], ['не передана', undefined]]) {
    it(`отклоняет: ${title}`, () => {
      expect(() => validateOrder(withLine({ sku: 'C-1', qty: 1, price })), `Цена: ${String(price)}`).toThrow(message);
    });
  }

  it('нулевая цена допустима (подарок)', () => {
    const order = withLine({ sku: 'GIFT', qty: 1, price: 0 });
    expect(validateOrder(order), 'Подарок за 0 рублей').toBe(order);
  });
});

describe('Порядок проверок', () => {
  it('сообщение называет проблемную позицию, а не первую', () => {
    expect(() => validateOrder(withLine({ sku: 'Z-9', qty: 0, price: 10 })), 'Вторая позиция плохая').toThrow('Позиция Z-9:');
  });

  it('сначала проверяется количество, потом цена', () => {
    expect(() => validateOrder(withLine({ sku: 'Z-9', qty: 0, price: -1 })), 'Плохи и количество, и цена').toThrow('количество');
  });
});
