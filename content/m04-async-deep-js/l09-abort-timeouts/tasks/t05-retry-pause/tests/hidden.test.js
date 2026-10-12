import { retry } from './index.js';
import { flaky, track } from './helpers.js';

describe('retry: отмена', () => {
  it('уже отменённый сигнал: task не вызывается', async () => {
    timers.useFake();
    const controller = new AbortController();
    const reason = new Error('Клиент ушёл');
    controller.abort(reason);
    const task = flaky(0);
    const state = track(retry(task, { attempts: 3, pauseMs: 1000, signal: controller.signal }));
    await timers.advance(0);
    expect(task.calls, 'Для отменённого сигнала вызовов нет').toBe(0);
    expect(state().error, 'Причина отмены').toBe(reason);
  });

  it('отмена во время паузы: повтора нет, таймеров нет', async () => {
    timers.useFake();
    const controller = new AbortController();
    const reason = new Error('Клиент ушёл');
    const task = flaky(5);
    const state = track(retry(task, { attempts: 5, pauseMs: 1000, signal: controller.signal }));
    await timers.advance(500);
    controller.abort(reason);
    await timers.advance(5000);
    expect(task.calls, 'После отмены новых вызовов быть не должно').toBe(1);
    expect(state().error, 'Причина отмены').toBe(reason);
    expect(timers.pending(), 'Таймер паузы очищен').toBe(0);
  });

  it('отмена во время вызова: ошибка не приводит к повтору', async () => {
    timers.useFake();
    const controller = new AbortController();
    const reason = new Error('Клиент ушёл');
    let calls = 0;
    const task = (signal) => {
      calls++;
      return new Promise((resolve, reject) => {
        signal.addEventListener('abort', () => reject(new Error('прервано')), { once: true });
      });
    };
    const state = track(retry(task, { attempts: 3, pauseMs: 1000, signal: controller.signal }));
    await timers.advance(100);
    controller.abort(reason);
    await timers.advance(5000);
    expect(calls, 'Повторов после отмены нет').toBe(1);
    expect(state().error, 'Вместо ошибки запроса возвращается причина отмены').toBe(reason);
  });
});

describe('retry: параметры', () => {
  it('task получает тот же signal', async () => {
    const controller = new AbortController();
    const task = flaky(0);
    await retry(task, { attempts: 1, pauseMs: 0, signal: controller.signal });
    expect(task.signals[0], 'Сигнал передаётся в task без изменений').toBe(controller.signal);
  });

  it('attempts равный 1: ровно один вызов и ошибка сразу', async () => {
    timers.useFake();
    const task = flaky(5);
    const state = track(retry(task, { attempts: 1, pauseMs: 1000 }));
    await timers.advance(0);
    expect(task.calls, 'Один вызов').toBe(1);
    expect(state().error?.message, 'Ошибка без ожидания паузы').toBe('503 (вызов 1)');
    expect(timers.pending(), 'Пауза не заводилась').toBe(0);
  });

  it('работает без сигнала', async () => {
    timers.useFake();
    const task = flaky(1);
    const state = track(retry(task, { attempts: 2, pauseMs: 300 }));
    await timers.advance(300);
    expect(state(), 'Вторая попытка удалась').toEqual({ value: { status: 'в пути' } });
  });
});
