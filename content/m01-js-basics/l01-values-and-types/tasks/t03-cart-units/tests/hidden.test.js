import { countUnits } from './index.js';

describe('countUnits: количество разных типов', () => {
  it('складывает числа и строки вместе', () => {
    const lines = [
      { sku: 'RUN-42', quantity: 2 },
      { sku: 'SOCK-07', quantity: '3' },
    ];
    expect(countUnits(lines), 'Количество числом (2) и строкой ("3")').toBe(5);
  });

  it('учитывает пробелы по краям', () => {
    expect(countUnits([{ sku: 'CAP-01', quantity: ' 4 ' }]), 'Поле " 4 " с пробелами').toBe(4);
  });
});

describe('countUnits: некорректный ввод', () => {
  it('пустое поле считается нулём', () => {
    const lines = [
      { sku: 'RUN-42', quantity: '' },
      { sku: 'SOCK-07', quantity: '3' },
    ];
    expect(countUnits(lines), 'Пустое поле количества').toBe(3);
  });

  it('текст вместо числа пропускается и не даёт NaN', () => {
    const lines = [
      { sku: 'RUN-42', quantity: 'abc' },
      { sku: 'SOCK-07', quantity: '3' },
      { sku: 'CAP-01', quantity: '12 шт' },
    ];
    expect(countUnits(lines), 'Строки "abc" и "12 шт" не учитываются').toBe(3);
  });

  it('если корректных строк нет, итог 0', () => {
    expect(countUnits([{ sku: 'RUN-42', quantity: 'abc' }]), 'Единственная строка с текстом').toBe(0);
  });

  it('много строк считаются правильно', () => {
    const lines = ['1', '2', '3', '4', '5'].map((quantity, index) => ({ sku: `ITEM-${index}`, quantity }));
    expect(countUnits(lines), 'Сумма 1+2+3+4+5').toBe(15);
  });
});
