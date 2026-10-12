import { parseShipment, type Result, type Shipment } from './shipment.js';

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
  const response = await fetchLike(`/shipments/${encodeURIComponent(id)}`);
  if (!response.ok) return { ok: false, error: { kind: 'http', status: response.status } };

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    return { ok: false, error: { kind: 'invalid', problems: ['ответ: не JSON'] } };
  }

  const parsed = parseShipment(body);
  if (!parsed.ok) return { ok: false, error: { kind: 'invalid', problems: parsed.error } };
  return parsed;
}
