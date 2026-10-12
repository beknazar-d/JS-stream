// Вызов службы доставки: первые failures вызовов падают с 503, потом отвечает.
export function flaky(failures, value = { status: 'в пути' }) {
  const task = (signal) => {
    task.calls++;
    task.signals.push(signal);
    if (task.calls <= failures) return Promise.reject(new Error(`503 (вызов ${task.calls})`));
    return Promise.resolve(value);
  };
  task.calls = 0;
  task.signals = [];
  return task;
}

// Итог промиса без ожидания: { value }, { error } или 'ожидание'.
export function track(promise) {
  let state = 'ожидание';
  promise.then((value) => { state = { value }; }, (error) => { state = { error }; });
  return () => state;
}
