// Запрос, который отвечает через ms и слушает сигнал отмены.
export function slowLoad(ms, value, seen = {}) {
  return (signal) => {
    seen.signal = signal;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve(value), ms);
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(signal.reason);
      }, { once: true });
    });
  };
}

// Итог промиса без ожидания: { value }, { error } или 'ожидание'.
export function track(promise) {
  let state = 'ожидание';
  promise.then((value) => { state = { value }; }, (error) => { state = { error }; });
  return () => state;
}
