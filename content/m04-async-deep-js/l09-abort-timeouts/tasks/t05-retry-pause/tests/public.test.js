import { retry } from './index.js';
import { flaky, track } from './helpers.js';

describe('retry', () => {
  it('успех с первого раза: без пауз', async () => {
    timers.useFake();
    const task = flaky(0);
    const state = track(retry(task, { attempts: 3, pauseMs: 1000 }));
    await timers.advance(0);
    expect(state(), 'Результат первого вызова').toEqual({ value: { status: 'в пути' } });
    expect(task.calls, 'Достаточно одного вызова').toBe(1);
  });

  it('две ошибки, потом успех, пауза между попытками', async () => {
    timers.useFake();
    const task = flaky(2);
    const state = track(retry(task, { attempts: 3, pauseMs: 1000 }));
    await timers.advance(999);
    expect(task.calls, 'До конца первой паузы вызов был один').toBe(1);
    await timers.advance(1);
    expect(task.calls, 'После первой паузы второй вызов').toBe(2);
    await timers.advance(1000);
    expect(task.calls, 'После второй паузы третий вызов').toBe(3);
    expect(state(), 'Третья попытка удалась').toEqual({ value: { status: 'в пути' } });
  });

  it('попытки закончились: последняя ошибка без лишней паузы', async () => {
    timers.useFake();
    const task = flaky(5);
    const state = track(retry(task, { attempts: 2, pauseMs: 1000 }));
    await timers.advance(1000);
    expect(task.calls, 'Всего два вызова').toBe(2);
    expect(state().error?.message, 'Ошибка последней попытки').toBe('503 (вызов 2)');
  });
});
