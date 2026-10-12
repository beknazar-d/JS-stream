export function createNotificationBatcher(sendBatch) {
  return function add(notification) {
    queueMicrotask(() => sendBatch([notification]));
  };
}
