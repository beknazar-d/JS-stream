import { receiveDelivery } from './index.js';

describe('receiveDelivery: строки из формы', () => {
  it('строки с числом принимаются, с пробелами тоже', () => {
    const result = receiveDelivery({ 'RUN-42': 5 }, [{ sku: 'RUN-42', quantity: ' 3 ' }]);
    expect(result.stock['RUN-42'], 'Остаток 5 плюс " 3 "').toBe(8);
  });

  it('количество не приклеивается как строка', () => {
    const result = receiveDelivery({ 'RUN-42': 5 }, [{ sku: 'RUN-42', quantity: '3' }]);
    expect(result.stock['RUN-42'], 'Тип остатка').toBeTypeOf('number');
    expect(result.stock['RUN-42'], 'Остаток 5 плюс "3"').toBe(8);
  });

  it('мусорные строки пропускаются', () => {
    const lines = [
      { sku: 'RUN-42', quantity: '' },
      { sku: 'RUN-42', quantity: 'abc' },
      { sku: 'RUN-42', quantity: '1.5' },
      { sku: 'RUN-42', quantity: 0 },
      { sku: 'RUN-42', quantity: -2 },
      { sku: 'RUN-42', quantity: undefined },
    ];
    const result = receiveDelivery({ 'RUN-42': 5 }, lines);
    expect(result, 'Ни одна строка не засчитана').toEqual({ stock: { 'RUN-42': 5 }, added: [] });
  });
});

describe('receiveDelivery: новые артикулы', () => {
  it('новый артикул появляется один раз в added', () => {
    const lines = [
      { sku: 'CAP-01', quantity: 5 },
      { sku: 'SOCK-07', quantity: 2 },
      { sku: 'CAP-01', quantity: '4' },
    ];
    const result = receiveDelivery({}, lines);
    expect(result.stock, 'Суммы по строкам').toEqual({ 'CAP-01': 9, 'SOCK-07': 2 });
    expect(result.added, 'Новые артикулы в порядке появления').toEqual(['CAP-01', 'SOCK-07']);
  });

  it('новый артикул только с мусорными строками не добавляется', () => {
    const result = receiveDelivery({ 'RUN-42': 1 }, [{ sku: 'GLOVE-03', quantity: 'abc' }]);
    expect(result, 'GLOVE-03 не принят').toEqual({ stock: { 'RUN-42': 1 }, added: [] });
  });

  it('артикул с нулевым остатком считается известным', () => {
    const result = receiveDelivery({ 'SOCK-07': 0 }, [{ sku: 'SOCK-07', quantity: 4 }]);
    expect(result, 'Остаток 0 и поставка 4').toEqual({ stock: { 'SOCK-07': 4 }, added: [] });
  });
});

describe('receiveDelivery: исходные данные', () => {
  it('stock и lines не меняются', () => {
    const stock = { 'RUN-42': 7 };
    const lines = [{ sku: 'RUN-42', quantity: '3' }, { sku: 'CAP-01', quantity: 5 }];
    const result = receiveDelivery(stock, lines);
    expect(stock, 'Остатки до проверки').toEqual({ 'RUN-42': 7 });
    expect(lines, 'Строки поставки').toEqual([{ sku: 'RUN-42', quantity: '3' }, { sku: 'CAP-01', quantity: 5 }]);
    expect(result.stock, 'Результат — другой объект').not.toBe(stock);
  });

  it('пустая поставка возвращает копию остатков', () => {
    const stock = { 'RUN-42': 7 };
    const result = receiveDelivery(stock, []);
    expect(result, 'Ничего не изменилось').toEqual({ stock: { 'RUN-42': 7 }, added: [] });
    expect(result.stock, 'Копия, а не тот же объект').not.toBe(stock);
  });
});
