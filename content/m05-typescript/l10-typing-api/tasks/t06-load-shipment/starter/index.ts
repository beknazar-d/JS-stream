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
  // Допишите: сеть, статус, тело.
  throw new Error('не реализовано');
}
