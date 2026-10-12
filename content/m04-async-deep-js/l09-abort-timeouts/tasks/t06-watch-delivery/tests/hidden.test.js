import { watchDelivery } from './index.js';
import { createTracker, track } from './stub.js';

const base = { intervalMs: 1000, requestTimeoutMs: 2000 };

describe('watchDelivery: неудачи', () => {
  it('три неудачи подряд — ошибка', async () => {
    timers.useFake();
    const tracker = createTracker([{ fail: true }]);
    const state = track(watchDelivery('P-601', { ...base, getStatus: tracker.getStatus }));
    await timers.advance(10000);
    expect(state().error?.message, 'Текст ошибки после трёх неудач').toBe('Служба доставки недоступна');
    expect(tracker.calls, 'Ровно три запроса').toHaveLength(3);
    expect(timers.pending(), 'После ошибки таймеров нет').toBe(0);
  });

  it('неудачи вперемешку с успехами не накапливаются', async () => {
    timers.useFake();
    const tracker = createTracker([
      { fail: true },
      { status: 'accepted' },
      { fail: true },
      { status: 'accepted' },
      { fail: true },
      { status: 'accepted' },
      { fail: true },
      { status: 'delivered' },
    ]);
    const state = track(watchDelivery('P-602', { ...base, getStatus: tracker.getStatus }));
    await timers.advance(60000);
    expect(state().value?.status, 'Четыре сбоя, но не подряд: опрос дожил до доставки').toBe('delivered');
  });

  it('таймаут запроса считается неудачей', async () => {
    timers.useFake();
    const tracker = createTracker([{ status: 'accepted', delay: 50000 }]);
    const state = track(watchDelivery('P-603', { ...base, getStatus: tracker.getStatus }));
    await timers.advance(60000);
    expect(state().error?.message, 'Три таймаута подряд').toBe('Служба доставки недоступна');
  });
});

describe('watchDelivery: отмена', () => {
  it('уже отменённый сигнал: запросов нет', async () => {
    timers.useFake();
    const controller = new AbortController();
    const reason = new Error('Страница закрыта');
    controller.abort(reason);
    const tracker = createTracker([{ status: 'accepted' }]);
    const state = track(watchDelivery('P-604', { ...base, getStatus: tracker.getStatus, signal: controller.signal }));
    await timers.advance(0);
    expect(tracker.calls, 'getStatus не вызывался').toHaveLength(0);
    expect(state().error, 'Причина отмены').toBe(reason);
  });

  it('отмена во время паузы: новых запросов нет, таймеров нет', async () => {
    timers.useFake();
    const controller = new AbortController();
    const reason = new Error('Страница закрыта');
    const tracker = createTracker([{ status: 'in_transit', delay: 100 }]);
    const state = track(watchDelivery('P-605', { ...base, getStatus: tracker.getStatus, signal: controller.signal }));
    await timers.advance(500);
    controller.abort(reason);
    await timers.advance(10000);
    expect(tracker.calls, 'После отмены запросов больше нет').toHaveLength(1);
    expect(state().error, 'Причина отмены').toBe(reason);
    expect(timers.pending(), 'Таймеров не осталось').toBe(0);
  });

  it('отмена во время запроса: запрос отменён, поздний ответ не вызывает колбэк', async () => {
    timers.useFake();
    const controller = new AbortController();
    const reason = new Error('Страница закрыта');
    const tracker = createTracker([{ status: 'in_transit', delay: 500 }], { ignoresSignal: true });
    const updates = [];
    const state = track(watchDelivery('P-606', {
      ...base,
      getStatus: tracker.getStatus,
      signal: controller.signal,
      onUpdate: (r) => updates.push(r.status),
    }));
    await timers.advance(200);
    controller.abort(reason);
    await timers.advance(2000);
    expect(state().error, 'Опрос отклонён причиной отмены').toBe(reason);
    expect(tracker.calls[0].signal.aborted, 'Запрос в полёте получил отмену').toBe(true);
    expect(updates, 'Поздний ответ не должен вызывать onUpdate').toEqual([]);
    expect(tracker.calls, 'Новых запросов нет').toHaveLength(1);
  });
});
