export function createEventHub() {
  return {
    on(event, handler, context) {},
    emit(event, ...args) {},
    listenerCount(event) {},
  };
}
