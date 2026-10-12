export async function withTimeout(load, ms) {
  const controller = new AbortController();
  let timer;
  const timeout = new Promise((resolve, reject) => {
    timer = setTimeout(() => reject(new Error(`Таймаут: ${ms} мс`)), ms);
  });
  try {
    return await Promise.race([load(controller.signal), timeout]);
  } finally {
    clearTimeout(timer);
    controller.abort();
  }
}
