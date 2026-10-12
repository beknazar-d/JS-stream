import { sleep, withTimeout } from './helpers.js';

const MAX_FAILURES = 3;

export async function watchDelivery(parcelId, { getStatus, intervalMs, requestTimeoutMs, signal, onUpdate }) {
  let lastStatus;
  let failures = 0;

  for (;;) {
    signal?.throwIfAborted();

    let response;
    try {
      response = await withTimeout((requestSignal) => getStatus(parcelId, requestSignal), requestTimeoutMs);
      failures = 0;
    } catch {
      failures++;
      if (failures >= MAX_FAILURES) throw new Error('Служба доставки недоступна');
      await sleep(intervalMs, signal);
      continue;
    }

    if (response.status !== lastStatus) {
      lastStatus = response.status;
      onUpdate?.(response);
    }
    if (response.status === 'delivered') return response;
    await sleep(intervalMs, signal);
  }
}
