export function later(callback) {
  // Вызвать callback в следующей задаче.
}

export function soon(callback) {
  // Вызвать callback в ближайшей микрозадаче.
}

export function scheduleReminder(send, delayMs) {
  // Вызвать send() через delayMs и вернуть функцию отмены.
}
