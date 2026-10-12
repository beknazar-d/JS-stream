import { createNotificationBatcher } from './index.js';

describe('createNotificationBatcher: основное', () => {
  it('три уведомления подряд уходят одной пачкой', async () => {
    const sendBatch = fn();
    const add = createNotificationBatcher(sendBatch);
    add('a');
    add('b');
    add('c');
    await Promise.resolve();
    expect(sendBatch, 'Одна пачка на три уведомления').toHaveBeenCalledTimes(1);
    expect(sendBatch, 'Порядок как при добавлении').toHaveBeenCalledWith(['a', 'b', 'c']);
  });

  it('отправка не происходит синхронно', async () => {
    const sendBatch = fn();
    const add = createNotificationBatcher(sendBatch);
    add('a');
    expect(sendBatch, 'Сразу после add').not.toHaveBeenCalled();
    await Promise.resolve();
  });

  it('после отправки собирается новая пачка', async () => {
    const sendBatch = fn();
    const add = createNotificationBatcher(sendBatch);
    add('a');
    await Promise.resolve();
    add('b');
    await Promise.resolve();
    expect(sendBatch, 'Две отдельные пачки').toHaveBeenCalledTimes(2);
    expect(sendBatch, 'Вторая пачка').toHaveBeenCalledWith(['b']);
  });
});
