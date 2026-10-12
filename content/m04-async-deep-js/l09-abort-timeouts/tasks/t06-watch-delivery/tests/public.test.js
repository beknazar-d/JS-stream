import { watchDelivery } from './index.js';
import { createTracker, track } from './stub.js';

const base = { intervalMs: 1000, requestTimeoutMs: 2000 };

describe('watchDelivery: обычный путь', () => {
  it('опрашивает, пока посылка не доставлена, и сообщает о смене статуса', async () => {
    timers.useFake();
    const tracker = createTracker([
      { status: 'accepted', delay: 100 },
      { status: 'in_transit', delay: 100 },
      { status: 'delivered', delay: 100 },
    ]);
    const updates = [];
    const state = track(watchDelivery('P-501', { ...base, getStatus: tracker.getStatus, onUpdate: (r) => updates.push(r.status) }));
    await timers.advance(5000);
    expect(state().value, 'Итоговый ответ').toEqual({ parcelId: 'P-501', status: 'delivered' });
    expect(updates, 'Статусы в порядке смены').toEqual(['accepted', 'in_transit', 'delivered']);
    expect(tracker.calls, 'Три запроса, после delivered запросов нет').toHaveLength(3);
  });

  it('одинаковые статусы подряд не вызывают колбэк', async () => {
    timers.useFake();
    const tracker = createTracker([
      { status: 'in_transit' },
      { status: 'in_transit' },
      { status: 'in_transit' },
      { status: 'delivered' },
    ]);
    const updates = [];
    const state = track(watchDelivery('P-502', { ...base, getStatus: tracker.getStatus, onUpdate: (r) => updates.push(r.status) }));
    await timers.advance(10000);
    expect(state().value?.status, 'Доставлено').toBe('delivered');
    expect(updates, 'Колбэк только при смене статуса').toEqual(['in_transit', 'delivered']);
  });

  it('первый запрос уходит сразу, следующий через intervalMs', async () => {
    timers.useFake();
    const tracker = createTracker([{ status: 'accepted', delay: 0 }]);
    track(watchDelivery('P-503', { ...base, getStatus: tracker.getStatus }));
    await timers.advance(0);
    expect(tracker.calls, 'Первый запрос без паузы').toHaveLength(1);
    await timers.advance(999);
    expect(tracker.calls, 'Пауза ещё идёт').toHaveLength(1);
    await timers.advance(1);
    expect(tracker.calls, 'Пауза прошла, второй запрос').toHaveLength(2);
  });
});

describe('watchDelivery: нестабильная служба', () => {
  it('зависший запрос отменяется по таймауту, опрос продолжается', async () => {
    timers.useFake();
    const tracker = createTracker([
      { status: 'accepted', delay: 10000 },
      { status: 'in_transit', delay: 100 },
      { status: 'delivered', delay: 100 },
    ]);
    const state = track(watchDelivery('P-504', { ...base, getStatus: tracker.getStatus }));
    await timers.advance(2000);
    expect(tracker.calls[0].signal.aborted, 'Зависший запрос получил отмену по таймауту').toBe(true);
    await timers.advance(10000);
    expect(state().value?.status, 'Опрос дошёл до доставки').toBe('delivered');
  });
});
