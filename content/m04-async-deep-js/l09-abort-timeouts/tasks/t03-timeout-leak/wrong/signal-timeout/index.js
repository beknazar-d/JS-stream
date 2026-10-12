export function withTimeout(load, ms) {
  const signal = AbortSignal.timeout(ms);
  const timeout = new Promise((resolve, reject) => {
    signal.addEventListener('abort', () => reject(new Error(`Таймаут: ${ms} мс`)), { once: true });
  });
  return Promise.race([load(signal), timeout]);
}
