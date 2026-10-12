export function createNotificationBatcher(sendBatch) {
  let batch = [];
  let scheduled = false;

  function flush() {
    scheduled = false;
    const items = batch;
    batch = [];
    sendBatch(items);
  }

  return function add(notification) {
    batch.push(notification);
    if (!scheduled) {
      scheduled = true;
      queueMicrotask(flush);
    }
  };
}
