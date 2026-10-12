import { later, soon, scheduleReminder } from './index.js';

describe('later и soon', () => {
  it('later не вызывает колбэк сразу, а вызывает в следующей задаче', async () => {
    timers.useFake();
    const callback = fn();
    later(callback);
    expect(callback, 'Сразу после вызова later').not.toHaveBeenCalled();
    await timers.advance(0);
    expect(callback, 'После того, как event loop взял задачу').toHaveBeenCalledTimes(1);
  });

  it('soon вызывает колбэк раньше таймеров', async () => {
    timers.useFake();
    const order = [];
    later(() => order.push('later'));
    soon(() => order.push('soon'));
    expect(order, 'Синхронно ничего не вызвано').toEqual([]);
    await Promise.resolve();
    expect(order, 'После микрозадач выполнен только soon').toEqual(['soon']);
    await timers.advance(0);
    expect(order, 'Потом later').toEqual(['soon', 'later']);
  });
});

describe('scheduleReminder', () => {
  it('отправляет напоминание через заданное время', async () => {
    timers.useFake();
    const send = fn();
    scheduleReminder(send, 1000);
    await timers.advance(999);
    expect(send, 'За 1 мс до срока').not.toHaveBeenCalled();
    await timers.advance(1);
    expect(send, 'Ровно через 1000 мс').toHaveBeenCalledTimes(1);
  });
});
