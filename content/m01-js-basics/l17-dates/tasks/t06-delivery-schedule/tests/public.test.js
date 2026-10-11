import { buildSchedule } from './index.js';

const today = new Date('2025-03-10T15:00:00Z');

describe('buildSchedule', () => {
  it('считает срок, подпись и просрочку', () => {
    const orders = [
      { id: 2, createdAt: '2025-03-06T15:20:00Z', days: 2 },
      { id: 1, createdAt: '2025-03-03T09:00:00Z', days: 3 },
    ];
    expect(buildSchedule(orders, today), 'Два заказа').toEqual({
      items: [
        { id: 1, deliverBy: '2025-03-06', label: 'четверг, 6 марта 2025 г.', daysLeft: -4, late: true },
        { id: 2, deliverBy: '2025-03-10', label: 'понедельник, 10 марта 2025 г.', daysLeft: 0, late: false },
      ],
      errors: [],
    });
  });

  it('складывает испорченный заказ в errors', () => {
    const orders = [{ id: 7, createdAt: 'вчера', days: 2 }];
    expect(buildSchedule(orders, today), 'Дата заказа — слово').toEqual({
      items: [],
      errors: [{ id: 7, message: 'Некорректная дата заказа' }],
    });
  });
});
