export function withTimeout(load, ms) {
  const controller = new AbortController();
  const timeout = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(`Таймаут: ${ms} мс`)), ms);
  });
  return Promise.race([load(controller.signal), timeout]);
}
