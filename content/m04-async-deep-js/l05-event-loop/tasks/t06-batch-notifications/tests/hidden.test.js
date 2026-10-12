import { createNotificationBatcher } from './index.js';

describe('Скорость отправки', () => {
  it('пачка уходит в микрозадаче, раньше любого таймера', async () => {
    timers.useFake();
    const sendBatch = fn();
    const add = createNotificationBatcher(sendBatch);
    add('резерв: чайник');
    add('резерв: кружка');
    await Promise.resolve();
    expect(sendBatch, 'Таймеры не двигались, но пачка должна уйти').toHaveBeenCalledWith(['резерв: чайник', 'резерв: кружка']);
    expect(timers.pending(), 'Батчер не должен ставить таймеры').toBe(0);
  });

  it('уведомления из разных микрозадач не склеиваются', async () => {
    const sendBatch = fn();
    const add = createNotificationBatcher(sendBatch);
    add('a');
    await Promise.resolve();
    add('b');
    await Promise.resolve();
    expect(sendBatch, 'Первая пачка').toHaveBeenCalledWith(['a']);
    expect(sendBatch, 'Вторая пачка').toHaveBeenCalledWith(['b']);
  });
});

describe('Надёжность', () => {
  it('уведомление, добавленное из sendBatch, не теряется', async () => {
    const batches = [];
    let add;
    const sendBatch = (batch) => {
      batches.push(batch);
      if (batch[0] === 'заказ принят') add('курьер назначен');
    };
    add = createNotificationBatcher(sendBatch);
    add('заказ принят');
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(batches, 'Второе уведомление должно уйти следующей пачкой').toEqual([['заказ принят'], ['курьер назначен']]);
  });

  it('sendBatch не вызывается с пустым массивом и ровно один раз на пачку', async () => {
    const sendBatch = fn();
    const add = createNotificationBatcher(sendBatch);
    add(1);
    add(2);
    add(3);
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    expect(sendBatch, 'Число вызовов sendBatch').toHaveBeenCalledTimes(1);
    expect(sendBatch.mock.calls.every(([batch]) => batch.length > 0), 'Пустых пачек быть не должно').toBe(true);
  });

  it('пачка получает свежий массив, а не общий', async () => {
    const received = [];
    const add = createNotificationBatcher((batch) => received.push(batch));
    add('a');
    await Promise.resolve();
    add('b');
    await Promise.resolve();
    expect(received, 'Первая пачка не изменилась после второй').toEqual([['a'], ['b']]);
  });

  it('два батчера независимы', async () => {
    const sendA = fn();
    const sendB = fn();
    const addA = createNotificationBatcher(sendA);
    const addB = createNotificationBatcher(sendB);
    addA('a1');
    addB('b1');
    addA('a2');
    await Promise.resolve();
    expect(sendA, 'Батчер A').toHaveBeenCalledWith(['a1', 'a2']);
    expect(sendB, 'Батчер B').toHaveBeenCalledWith(['b1']);
  });
});
