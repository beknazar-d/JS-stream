import { isEvenOrder, boxVolume, restock } from './index.js';

describe('isEvenOrder', () => {
  it('чётный номер даёт true', () => {
    expect(isEvenOrder(1042), 'Номер 1042').toBe(true);
    expect(isEvenOrder(0), 'Номер 0').toBe(true);
  });

  it('нечётный номер даёт false', () => {
    expect(isEvenOrder(1043), 'Номер 1043').toBe(false);
  });
});

describe('boxVolume', () => {
  it('возводит сторону в третью степень', () => {
    expect(boxVolume(3), 'Куб со стороной 3').toBe(27);
    expect(boxVolume(2), 'Куб со стороной 2').toBe(8);
  });
});

describe('restock', () => {
  it('прибавляет поставку к остатку', () => {
    expect(restock(40, 5), 'Остаток 40, поставка 5').toBe(45);
  });

  it('понимает строки из формы', () => {
    const result = restock('40', '5');
    expect(result, 'Остаток "40", поставка "5"').toBe(45);
    expect(result, 'Результат должен быть числом').toBeTypeOf('number');
  });
});
