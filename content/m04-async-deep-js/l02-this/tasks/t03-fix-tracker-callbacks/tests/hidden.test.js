import { createTracker, markAll, makeMarker } from './index.js';

const a = { id: 'A-1' };
const b = { id: 'B-2' };
const c = { id: 'C-3' };

describe('markAll: повторы', () => {
  it('уже помеченные заказы не считаются', () => {
    const tracker = createTracker();
    markAll(tracker, [a]);
    expect(markAll(tracker, [a, b, c]), 'Новыми были только b и c').toBe(2);
    expect(tracker.shipped, 'Заказ a не дублируется').toEqual(['A-1', 'B-2', 'C-3']);
  });

  it('пустой список', () => {
    const tracker = createTracker();
    expect(markAll(tracker, []), 'Пустой список заказов').toBe(0);
  });
});

describe('makeMarker: отдельный вызов', () => {
  it('маркер, сохранённый в переменную, помнит трекер', () => {
    const tracker = createTracker();
    const mark = makeMarker(tracker);
    expect(mark(a), 'Первый вызов').toBe(true);
    expect(mark(a), 'Повторный вызов').toBe(false);
    expect(tracker.shipped, 'Заказ записан один раз').toEqual(['A-1']);
  });

  it('два трекера независимы', () => {
    const first = createTracker();
    const second = createTracker();
    markAll(first, [a]);
    makeMarker(second)(b);
    expect(first.shipped, 'Первый трекер').toEqual(['A-1']);
    expect(second.shipped, 'Второй трекер').toEqual(['B-2']);
  });
});
