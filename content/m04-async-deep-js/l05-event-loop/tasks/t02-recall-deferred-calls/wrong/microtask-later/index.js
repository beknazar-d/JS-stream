export function later(callback) {
  queueMicrotask(callback);
}

export function soon(callback) {
  queueMicrotask(callback);
}

export function scheduleReminder(send, delayMs) {
  const id = setTimeout(send, delayMs);
  return () => clearTimeout(id);
}
