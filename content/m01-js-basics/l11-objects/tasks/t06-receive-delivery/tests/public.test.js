import { receiveDelivery } from './index.js';

describe('receiveDelivery', () => {
  it('прибавляет количество к известному артикулу', () => {
    const result = receiveDelivery({ 'RUN-42': 7 }, [{ sku: 'RUN-42', quantity: 3 }]);
    expect(result, 'Остаток 7 плюс поставка 3').toEqual({ stock: { 'RUN-42': 10 }, added: [] });
  });

  it('пример из тикета: строка с текстом и новый артикул', () => {
    const result = receiveDelivery({ 'RUN-42': 7 }, [
      { sku: 'RUN-42', quantity: '3' },
      { sku: 'CAP-01', quantity: 5 },
    ]);
    expect(result, 'Строковое количество и новый артикул').toEqual({
      stock: { 'RUN-42': 10, 'CAP-01': 5 },
      added: ['CAP-01'],
    });
  });

  it('исходный склад не меняется', () => {
    const stock = { 'RUN-42': 7 };
    receiveDelivery(stock, [{ sku: 'RUN-42', quantity: 3 }]);
    expect(stock, 'Остатки до проверки поставки').toEqual({ 'RUN-42': 7 });
  });
});
