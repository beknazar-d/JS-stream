import { sleep, withTimeout } from './helpers.js';

export async function watchDelivery(parcelId, { getStatus, intervalMs, requestTimeoutMs, signal, onUpdate }) {
  // Опрашивайте getStatus, пока посылка не будет доставлена.
}
