import { planShift } from './index.js';

describe('planShift: порядок', () => {
  it('срочные идут в порядке очереди, а не в порядке списка urgent', () => {
    const plan = planShift(['B-1', 'B-2', 'B-3', 'B-4'], ['B-4', 'B-2'], 4);
    expect(plan.batch, 'Срочные B-2 и B-4 в порядке очереди, потом остальные').toEqual(['B-2', 'B-4', 'B-1', 'B-3']);
  });

  it('все заказы срочные', () => {
    const plan = planShift(['B-1', 'B-2'], ['B-2', 'B-1'], 1);
    expect(plan, 'Порядок очереди').toEqual({ batch: ['B-1'], left: ['B-2'] });
  });
});

describe('planShift: дубли и лишние номера', () => {
  it('дубль обычного заказа убирается', () => {
    const plan = planShift(['B-1', 'B-2', 'B-1'], [], 10);
    expect(plan.batch, 'B-1 один раз').toEqual(['B-1', 'B-2']);
  });

  it('дубль срочного заказа убирается', () => {
    const plan = planShift(['B-1', 'B-2', 'B-2'], ['B-2'], 10);
    expect(plan.batch, 'B-2 один раз, и первым').toEqual(['B-2', 'B-1']);
  });

  it('срочных номеров нет в очереди: их нет и в плане', () => {
    const plan = planShift(['B-1'], ['Z-1', 'Z-2'], 5);
    expect(plan, 'Только B-1').toEqual({ batch: ['B-1'], left: [] });
  });
});

describe('planShift: вместимость', () => {
  it('нулевая вместимость: всё переносится', () => {
    const plan = planShift(['B-1', 'B-2'], ['B-2'], 0);
    expect(plan, 'Смена на ноль заказов').toEqual({ batch: [], left: ['B-2', 'B-1'] });
  });

  it('вместимость больше плана: left пустой', () => {
    const plan = planShift(['B-1', 'B-2'], [], 100);
    expect(plan.left, 'Переносить нечего').toEqual([]);
  });

  it('пустая очередь', () => {
    const plan = planShift([], ['B-1'], 3);
    expect(plan, 'Нет заказов — нет плана').toEqual({ batch: [], left: [] });
  });
});

describe('planShift: исходные данные', () => {
  it('queue и urgent не изменяются', () => {
    const queue = ['B-1', 'B-2', 'B-3', 'B-2'];
    const urgent = ['B-3', 'Z-9'];
    planShift(queue, urgent, 2);
    expect(queue, 'Очередь после вызова').toEqual(['B-1', 'B-2', 'B-3', 'B-2']);
    expect(urgent, 'Срочные после вызова').toEqual(['B-3', 'Z-9']);
  });
});
