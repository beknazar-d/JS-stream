export function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => reject(signal.reason), { once: true });
  });
}
