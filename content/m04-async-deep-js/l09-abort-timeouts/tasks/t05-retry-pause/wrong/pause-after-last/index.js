import { sleep } from './sleep.js';

export async function retry(task, { attempts, pauseMs, signal } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    signal?.throwIfAborted();
    try {
      return await task(signal);
    } catch (error) {
      if (signal?.aborted) throw signal.reason;
      lastError = error;
    }
    await sleep(pauseMs, signal);
  }
  throw lastError;
}
