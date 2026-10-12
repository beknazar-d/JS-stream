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
      if (!list) {
        return;
      }
      const index = list.indexOf(record);
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
    for (const { handler, context } of snapshot) {
      handler.apply(context, args);
    }
    return snapshot.length;
  }

  function listenerCount(event) {
    const list = subscriptions.get(event);
    return list ? list.length : 0;
  }

  return { on, emit, listenerCount };
}
