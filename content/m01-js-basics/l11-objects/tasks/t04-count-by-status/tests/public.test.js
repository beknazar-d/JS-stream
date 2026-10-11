import { countByStatus } from './index.js';

describe('countByStatus', () => {
  it('считает заказы по статусам', () => {
    const orders = [
      { id: 'A-1', status: 'new' },
      { id: 'A-2', status: 'paid' },
      { id: 'A-3', status: 'new' },
    ];
    expect(countByStatus(orders), 'Два новых и один оплаченный').toEqual({ new: 2, paid: 1 });
  });

  it('пустой список даёт пустой объект', () => {
    expect(countByStatus([]), 'Пустой список заказов').toEqual({});
  });
});
