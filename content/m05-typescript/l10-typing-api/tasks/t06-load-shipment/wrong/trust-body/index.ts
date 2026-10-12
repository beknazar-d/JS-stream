import { type Result, type Shipment } from './shipment.js';

export type { Result, Shipment } from './shipment.js';

export type ApiError =
  | { kind: 'network'; message: string }
  | { kind: 'http'; status: number }
  | { kind: 'invalid'; problems: string[] };

export interface FetchResponse {
  ok: boolean;
  status: number;
  json(): Promise<unknown>;
}

export type FetchLike = (url: string) => Promise<FetchResponse>;

export async function loadShipment(fetchLike: FetchLike, id: string): Promise<Result<Shipment, ApiError>> {
  let response: FetchResponse;
  try {
    response = await fetchLike(`/shipments/${encodeURIComponent(id)}`);
  } catch (error) {
    return { ok: false, error: { kind: 'network', message: error instanceof Error ? error.message : String(error) } };
  }

  if (!response.ok) return { ok: false, error: { kind: 'http', status: response.status } };

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return { ok: false, error: { kind: 'invalid', problems: ['ответ: не JSON'] } };
  }

  return { ok: true, value: body as Shipment };
}
