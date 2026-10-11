import { planShift } from './index.js';

describe('planShift', () => {
  it('срочные заказы идут вперёд', () => {
    const plan = planShift(['A-1', 'A-2', 'A-3'], ['A-3'], 2);
    expect(plan.batch, 'Смена на два заказа, срочный A-3 первым').toEqual(['A-3', 'A-1']);
    expect(plan.left, 'Остаток переносится на завтра').toEqual(['A-2']);
  });

  it('пример из тикета: дубли и чужой срочный номер', () => {
    const plan = planShift(['A-1', 'A-2', 'A-3', 'A-2'], ['A-3', 'Z-9'], 2);
    expect(plan, 'План смены').toEqual({ batch: ['A-3', 'A-1'], left: ['A-2'] });
  });

  it('без срочных заказов порядок очереди сохраняется', () => {
    const plan = planShift(['A-1', 'A-2', 'A-3'], [], 5);
    expect(plan, 'Все заказы в смену').toEqual({ batch: ['A-1', 'A-2', 'A-3'], left: [] });
  });
});
