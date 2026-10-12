import { createEventHub } from './index.js';

describe('createEventHub: методы отдельно от объекта', () => {
  it('работает после деструктуризации', () => {
    const { on, emit, listenerCount } = createEventHub();
    const handler = fn();
    on('delivered', handler);
    expect(listenerCount('delivered'), 'Одна подписка').toBe(1);
    expect(emit('delivered', 'ORD-5'), 'Один вызов').toBe(1);
    expect(handler, 'Аргумент').toHaveBeenCalledWith('ORD-5');
  });
});

describe('createEventHub: контекст', () => {
  it('без контекста this равен undefined', () => {
    const hub = createEventHub();
    let seen = 'не вызвано';
    hub.on('delivered', function () {
      seen = this;
    });
    hub.emit('delivered');
    expect(seen, 'Обработчик без контекста').toBeUndefined();
  });

  it('у разных подписок разные контексты', () => {
    const hub = createEventHub();
    const a = { id: 'A', seen: [], handle(x) { this.seen.push(x); } };
    const b = { id: 'B', seen: [], handle(x) { this.seen.push(x); } };
    hub.on('delayed', a.handle, a);
    hub.on('delayed', b.handle, b);
    hub.emit('delayed', 'ORD-6');
    expect(a.seen, 'Первый контекст').toEqual(['ORD-6']);
    expect(b.seen, 'Второй контекст').toEqual(['ORD-6']);
  });
});

describe('createEventHub: отписка', () => {
  it('повторный off безопасен и не снимает чужие подписки', () => {
    const hub = createEventHub();
    const handler = fn();
    const off = hub.on('delivered', handler);
    hub.on('delivered', handler);
    off();
    off();
    expect(hub.listenerCount('delivered'), 'Осталась вторая подписка').toBe(1);
    hub.emit('delivered');
    expect(handler, 'Вторая подписка работает').toHaveBeenCalledTimes(1);
  });

  it('одна функция подписана дважды: off снимает только свою подписку', () => {
    const hub = createEventHub();
    const handler = fn();
    const offFirst = hub.on('delivered', handler);
    hub.on('delivered', handler);
    expect(hub.emit('delivered'), 'Две подписки').toBe(2);
    offFirst();
    expect(hub.emit('delivered'), 'Осталась одна').toBe(1);
  });

  it('обработчик отписывает сам себя, остальные получают событие', () => {
    const hub = createEventHub();
    const order = [];
    const offFirst = hub.on('delivered', () => {
      order.push('first');
      offFirst();
    });
    hub.on('delivered', () => order.push('second'));
    hub.on('delivered', () => order.push('third'));
    expect(hub.emit('delivered'), 'Все три вызваны').toBe(3);
    expect(order, 'Второй и третий не пропущены').toEqual(['first', 'second', 'third']);
    expect(hub.emit('delivered'), 'Первый больше не вызывается').toBe(2);
  });
});

describe('createEventHub: события и хабы независимы', () => {
  it('разные события не влияют друг на друга', () => {
    const hub = createEventHub();
    const onDelivered = fn();
    const onDelayed = fn();
    hub.on('delivered', onDelivered);
    hub.on('delayed', onDelayed);
    hub.emit('delayed');
    expect(onDelivered, 'delivered не вызывался').not.toHaveBeenCalled();
    expect(onDelayed, 'delayed вызывался').toHaveBeenCalledTimes(1);
    expect(hub.listenerCount('cancelled'), 'Нет подписок на cancelled').toBe(0);
  });

  it('два хаба независимы', () => {
    const first = createEventHub();
    const second = createEventHub();
    const handler = fn();
    first.on('delivered', handler);
    second.emit('delivered');
    expect(handler, 'Событие второго хаба не дошло до первого').not.toHaveBeenCalled();
  });
});
