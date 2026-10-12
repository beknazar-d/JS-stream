import { sleep } from './sleep.js';

export async function retry(task, { attempts, pauseMs, signal } = {}) {
  // Вызывайте task(signal) до attempts раз, между попытками ждите pauseMs.
}
