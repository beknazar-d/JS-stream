import { createEventHub } from './index.js';

describe('createEventHub: основное', () => {
  it('вызывает обработчики в порядке подписки с аргументами', () => {
    const hub = createEventHub();
    const calls = [];
    hub.on('delivered', (id) => calls.push('first:' + id));
    hub.on('delivered', (id) => calls.push('second:' + id));
    const count = hub.emit('delivered', 'ORD-1');
    expect(calls, 'Порядок и аргументы').toEqual(['first:ORD-1', 'second:ORD-1']);
    expect(count, 'emit возвращает число вызванных обработчиков').toBe(2);
  });

  it('emit без подписчиков', () => {
    const hub = createEventHub();
    expect(hub.emit('delayed', 'ORD-2'), 'Подписчиков нет').toBe(0);
  });

  it('контекст становится this', () => {
    const hub = createEventHub();
    const board = {
      shown: [],
      onDelivered(id) {
        this.shown.push(id);
      },
    };
    hub.on('delivered', board.onDelivered, board);
    hub.emit('delivered', 'ORD-3');
    expect(board.shown, 'Метод табло выполнился с this равным board').toEqual(['ORD-3']);
  });

  it('off отменяет подписку', () => {
    const hub = createEventHub();
    const handler = fn();
    const off = hub.on('delivered', handler);
    off();
    hub.emit('delivered', 'ORD-4');
    expect(handler, 'Обработчик отписан').not.toHaveBeenCalled();
  });
});
