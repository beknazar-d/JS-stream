// Пауза, которую можно отменить сигналом.
export function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal.reason);
    };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

// Запускает run(requestSignal). Отклоняется по таймауту или по отмене внешнего
// signal; в обоих случаях отменяет requestSignal и очищает таймер.
export function withTimeout(run, ms, signal) {
  const controller = new AbortController();
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    const finish = () => {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onOuterAbort);
    };
    const fail = (error) => {
      controller.abort(error);
      finish();
      reject(error);
    };
    const onOuterAbort = () => fail(signal.reason);
    const timer = setTimeout(() => fail(new Error(`Таймаут: ${ms} мс`)), ms);
    signal?.addEventListener('abort', onOuterAbort, { once: true });
    run(controller.signal).then(
      (value) => { finish(); resolve(value); },
      (error) => { finish(); reject(error); },
    );
  });
}
