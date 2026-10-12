import { withTimeout } from './index.js';
import { slowLoad, track } from './helpers.js';

describe('withTimeout: ошибка запроса', () => {
  it('прокидывает ошибку load и очищает таймер', async () => {
    timers.useFake();
    const failure = new Error('503 Service Unavailable');
    const load = () => Promise.reject(failure);
    const state = track(withTimeout(load, 5000));
    await timers.advance(0);
    expect(state().error, 'Ошибка запроса должна дойти без изменений').toBe(failure);
    expect(timers.pending(), 'Таймер очищается и после ошибки').toBe(0);
  });
});

describe('withTimeout: сигнал', () => {
  it('после успешного ответа сигнал не отменён', async () => {
    timers.useFake();
    const seen = {};
    const state = track(withTimeout(slowLoad(100, 'ok', seen), 1000));
    await timers.advance(100);
    expect(state(), 'Результат').toEqual({ value: 'ok' });
    expect(seen.signal.aborted, 'Успешный запрос не должен получать отмену').toBe(false);
  });

  it('причина отмены — ошибка таймаута', async () => {
    timers.useFake();
    const seen = {};
    const state = track(withTimeout(slowLoad(9000, 'поздно', seen), 1000));
    await timers.advance(1000);
    expect(seen.signal.reason, 'signal.reason').toBe(state().error);
  });

  it('запрос, отвеченный ровно в момент таймаута до него, не теряется', async () => {
    timers.useFake();
    const state = track(withTimeout(slowLoad(999, 'успел'), 1000));
    await timers.advance(999);
    expect(state(), 'Ответ на 999 мс при таймауте 1000').toEqual({ value: 'успел' });
  });

  it('после таймаута в очереди нет таймеров', async () => {
    timers.useFake();
    const state = track(withTimeout(slowLoad(9000, 'поздно'), 1000));
    await timers.advance(1000);
    expect(state().error?.message, 'Таймаут наступил').toBe('Таймаут: 1000 мс');
    expect(timers.pending(), 'Ни таймера таймаута, ни таймера запроса').toBe(0);
  });
});
