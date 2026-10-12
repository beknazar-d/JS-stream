import { sleep } from './index.js';

describe('sleep: краевые случаи', () => {
  it('уже отменённый сигнал отклоняет сразу и не создаёт таймер', async () => {
    timers.useFake();
    const controller = new AbortController();
    controller.abort();
    const pause = sleep(5000, controller.signal);
    expect(timers.pending(), 'Для отменённого сигнала таймер создавать не нужно').toBe(0);
    await expect(pause, 'Причина по умолчанию — AbortError').rejects.toMatchObject({ name: 'AbortError' });
  });

  it('по умолчанию причина отмены — AbortError', async () => {
    timers.useFake();
    const controller = new AbortController();
    const pause = sleep(1000, controller.signal);
    controller.abort();
    await expect(pause, 'abort() без аргумента').rejects.toMatchObject({ name: 'AbortError' });
  });

  it('пауза с неотменённым сигналом выполняется', async () => {
    timers.useFake();
    const controller = new AbortController();
    let value = 'не выполнено';
    sleep(200, controller.signal).then((result) => { value = result; });
    await timers.advance(200);
    expect(value, 'Результат успешной паузы — undefined').toBeUndefined();
    expect(timers.pending(), 'Таймеров не осталось').toBe(0);
  });

  it('отмена после завершения паузы ничего не ломает', async () => {
    timers.useFake();
    const controller = new AbortController();
    const pause = sleep(100, controller.signal);
    await timers.advance(100);
    controller.abort();
    await expect(pause, 'Пауза уже выполнена').resolves.toBeUndefined();
  });
});
