import { checkQuantity, tryQuantity } from './index.js';

const MESSAGE = 'Количество должно быть целым числом больше нуля';

describe('checkQuantity', () => {
  it('пропускает целое положительное число', () => {
    expect(checkQuantity(3), 'Количество 3').toBe(3);
  });

  it('останавливается на нуле', () => {
    expect(() => checkQuantity(0), 'Количество 0').toThrow(MESSAGE);
  });
});

describe('tryQuantity', () => {
  it('возвращает ok: true для хорошей строки', () => {
    expect(tryQuantity('4'), 'Строка «4»').toEqual({ ok: true, value: 4 });
  });

  it('возвращает ok: false с текстом ошибки', () => {
    expect(tryQuantity('abc'), 'Строка «abc»').toEqual({ ok: false, error: MESSAGE });
  });
});
