let timerId;

export function later(callback) {
  setTimeout(callback, 0);
}

export function soon(callback) {
  queueMicrotask(callback);
}

export function scheduleReminder(send, delayMs) {
  timerId = setTimeout(send, delayMs);
  return () => clearTimeout(timerId);
}
