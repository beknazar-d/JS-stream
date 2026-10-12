export async function withTimeout(load, ms) {
  const controller = new AbortController();
  let timer;
  const timeout = new Promise((resolve, reject) => {
    timer = setTimeout(() => {
      const error = new Error(`Таймаут: ${ms} мс`);
      controller.abort(error);
      reject(error);
    }, ms);
  });
  const result = await Promise.race([load(controller.signal), timeout]);
  clearTimeout(timer);
  return result;
}
