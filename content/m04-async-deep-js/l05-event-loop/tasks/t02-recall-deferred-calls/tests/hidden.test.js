import { later, soon, scheduleReminder } from './index.js';

describe('Отмена напоминания', () => {
  it('отменённое напоминание не приходит', async () => {
    timers.useFake();
    const send = fn();
    const cancel = scheduleReminder(send, 500);
    expect(cancel, 'scheduleReminder возвращает функцию отмены').toBeTypeOf('function');
    cancel();
    await timers.advance(2000);
    expect(send, 'Напоминание отменено до срока').not.toHaveBeenCalled();
  });

  it('отмена одного напоминания не трогает другое', async () => {
    timers.useFake();
    const first = fn();
    const second = fn();
    const cancelFirst = scheduleReminder(first, 500);
    scheduleReminder(second, 700);
    cancelFirst();
    await timers.advance(1000);
    expect(first, 'Первое отменено').not.toHaveBeenCalled();
    expect(second, 'Второе должно прийти').toHaveBeenCalledTimes(1);
  });

  it('отмена после срабатывания безопасна', async () => {
    timers.useFake();
    const send = fn();
    const cancel = scheduleReminder(send, 100);
    await timers.advance(100);
    cancel();
    await timers.advance(1000);
    expect(send, 'send вызван один раз').toHaveBeenCalledTimes(1);
  });
});

describe('Синхронность', () => {
  it('ни одна функция не вызывает колбэк сразу', () => {
    timers.useFake();
    const a = fn();
    const b = fn();
    const c = fn();
    later(a);
    soon(b);
    scheduleReminder(c, 0);
    expect(a, 'later').not.toHaveBeenCalled();
    expect(b, 'soon').not.toHaveBeenCalled();
    expect(c, 'scheduleReminder с нулевой задержкой').not.toHaveBeenCalled();
  });

  it('несколько soon выполняются по порядку постановки', async () => {
    const order = [];
    soon(() => order.push(1));
    soon(() => order.push(2));
    await Promise.resolve();
    await Promise.resolve();
    expect(order, 'Микрозадачи идут в порядке постановки').toEqual([1, 2]);
  });
});
