// Геокодер-заглушка: отвечает через delays[query] мс и слушает сигнал.
export function createGeocoder(delays, { listensToSignal = true } = {}) {
  const calls = [];
  const load = (query, signal) => {
    calls.push({ query, signal });
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => resolve([`${query}: улица Баумана`]), delays[query]);
      if (listensToSignal) {
        signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(signal.reason);
        }, { once: true });
      }
    });
  };
  return { load, calls };
}

// Итог промиса без ожидания: { value }, { error } или 'ожидание'.
export function track(promise) {
  let state = 'ожидание';
  promise.then((value) => { state = { value }; }, (error) => { state = { error }; });
  return () => state;
}
