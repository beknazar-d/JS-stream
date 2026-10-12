export type ShipmentStatus = 'created' | 'in_transit' | 'delivered' | 'cancelled';

export interface Courier {
  id: number;
  name: string;
}

export interface Shipment {
  id: string;
  status: ShipmentStatus;
  weightKg: number;
  courier: Courier | null;
}

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

const STATUSES: readonly string[] = ['created', 'in_transit', 'delivered', 'cancelled'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isShipmentStatus(value: unknown): value is ShipmentStatus {
  return typeof value === 'string' && STATUSES.includes(value);
}

function isPositiveNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}

function readCourier(value: unknown): Courier | null | undefined {
  if (value === null) return null;
  if (!isRecord(value)) return undefined;
  const { id, name } = value;
  if (typeof id !== 'number' || typeof name !== 'string' || name === '') return undefined;
  return { id, name };
}

export function parseShipment(raw: unknown): Result<Shipment, string[]> {
  if (!isRecord(raw)) return { ok: false, error: ['ответ: ожидался объект'] };

  const { id, status, weightKg } = raw;
  const courier = readCourier(raw.courier);

  if (typeof id !== 'string' || id === '') return { ok: false, error: ['id: ожидалась непустая строка'] };
  if (!isShipmentStatus(status)) return { ok: false, error: ['status: неизвестный статус'] };
  if (!isPositiveNumber(weightKg)) return { ok: false, error: ['weightKg: ожидалось число больше нуля'] };
  if (courier === undefined) return { ok: false, error: ['courier: ожидался null или курьер с id и name'] };

  return { ok: true, value: { id, status, weightKg, courier } };
}
