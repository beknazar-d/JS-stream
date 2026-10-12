// Служба доставки-заглушка. script — ответы по очереди (последний повторяется):
//   { status: 'in_transit', delay: 100 } или { fail: true, delay: 100 }.
// По умолчанию слушает сигнал отмены; ignoresSignal: true — как «плохая» служба.
export function createTracker(script, { ignoresSignal = false } = {}) {
  const calls = [];
  const getStatus = (parcelId, signal) => {
    const step = script[Math.min(calls.length, script.length - 1)];
    calls.push({ parcelId, signal });
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        if (step.fail) reject(new Error('503 Service Unavailable'));
        else resolve({ parcelId, status: step.status });
      }, step.delay ?? 0);
      if (!ignoresSignal) {
        signal.addEventListener('abort', () => {
          clearTimeout(timer);
          reject(signal.reason);
        }, { once: true });
      }
    });
  };
  return { getStatus, calls };
}

// Итог промиса без ожидания: { value }, { error } или 'ожидание'.
export function track(promise) {
  let state = 'ожидание';
  promise.then((value) => { state = { value }; }, (error) => { state = { error }; });
  return () => state;
}
