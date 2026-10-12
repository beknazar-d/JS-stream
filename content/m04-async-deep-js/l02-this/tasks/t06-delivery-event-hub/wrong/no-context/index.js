export function createEventHub() {
  const subscriptions = new Map();

  function on(event, handler) {
    const record = { handler };
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
    const snapshot = [...list];
    for (const { handler } of snapshot) {
      handler(...args);
    }
    return snapshot.length;
  }

  function listenerCount(event) {
    const list = subscriptions.get(event);
    return list ? list.length : 0;
  }

  return { on, emit, listenerCount };
}
