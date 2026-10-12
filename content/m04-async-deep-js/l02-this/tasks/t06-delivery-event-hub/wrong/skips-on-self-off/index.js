export function createEventHub() {
  const subscriptions = new Map();

  function on(event, handler, context) {
    const record = { handler, context };
    if (!subscriptions.has(event)) {
      subscriptions.set(event, []);
    }
    subscriptions.get(event).push(record);

    return function off() {
      const list = subscriptions.get(event);
      const index = list ? list.indexOf(record) : -1;
      if (index !== -1) {
        list.splice(index, 1);
      }
    };
  }

  function emit(event, ...args) {
    const list = subscriptions.get(event);
    if (!list) {
      return 0;
    }
    let called = 0;
    for (let i = 0; i < list.length; i++) {
      list[i].handler.apply(list[i].context, args);
      called = called + 1;
    }
    return called;
  }

  function listenerCount(event) {
    const list = subscriptions.get(event);
    return list ? list.length : 0;
  }

  return { on, emit, listenerCount };
}
