import { sleep } from './index.js';

describe('sleep без сигнала', () => {
  it('выполняется ровно через указанное время', async () => {
    timers.useFake();
    let done = false;
    sleep(1000).then(() => { done = true; });
    await timers.advance(999);
    expect(done, 'Через 999 мс пауза ещё идёт').toBe(false);
    await timers.advance(1);
    expect(done, 'Через 1000 мс пауза закончилась').toBe(true);
  });
});

describe('sleep с сигналом', () => {
  it('отмена во время паузы отклоняет промис с причиной', async () => {
    timers.useFake();
    const controller = new AbortController();
    const reason = new Error('Экран закрыт');
    const pause = sleep(30000, controller.signal);
    await timers.advance(1000);
    controller.abort(reason);
    await expect(pause, 'Пауза должна отклониться причиной отмены').rejects.toBe(reason);
  });

  it('после отмены таймеров не остаётся', async () => {
    timers.useFake();
    const controller = new AbortController();
    const pause = sleep(30000, controller.signal);
    pause.catch(() => {});
    controller.abort();
    await timers.advance(0);
    expect(timers.pending(), 'Таймер паузы должен быть очищен').toBe(0);
  });
});
