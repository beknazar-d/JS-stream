export function createNotificationBatcher(sendBatch) {
  let batch = [];
  let scheduled = false;

  function flush() {
    sendBatch(batch);
    batch = [];
    scheduled = false;
  }

  return function add(notification) {
    batch.push(notification);
    if (!scheduled) {
      scheduled = true;
      queueMicrotask(flush);
    }
  };
}
