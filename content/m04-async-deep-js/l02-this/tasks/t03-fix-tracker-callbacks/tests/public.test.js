import { createTracker, markAll, makeMarker } from './index.js';

const a = { id: 'A-1' };
const b = { id: 'B-2' };

describe('markAll', () => {
  it('помечает заказы и считает новые', () => {
    const tracker = createTracker();
    expect(markAll(tracker, [a, b]), 'Оба заказа новые').toBe(2);
    expect(tracker.shipped, 'Список отправленных').toEqual(['A-1', 'B-2']);
  });
});

describe('makeMarker', () => {
  it('маркер работает в forEach', () => {
    const tracker = createTracker();
    [a, b].forEach(makeMarker(tracker));
    expect(tracker.shipped, 'Оба заказа помечены').toEqual(['A-1', 'B-2']);
  });
});
