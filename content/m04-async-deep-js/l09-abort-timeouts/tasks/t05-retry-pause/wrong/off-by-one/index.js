import { sleep } from './sleep.js';

export async function retry(task, { attempts, pauseMs, signal } = {}) {
  for (let attempt = 0; ; attempt++) {
    signal?.throwIfAborted();
    try {
      return await task(signal);
    } catch (error) {
      if (signal?.aborted) throw signal.reason;
      if (attempt >= attempts) throw error;
    }
    await sleep(pauseMs, signal);
  }
}
