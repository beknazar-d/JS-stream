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

export function parseShipment(raw: unknown): Result<Shipment, string[]> {
  // Допишите проверки. Пока функция отвечает «не реализовано».
  return { ok: false, error: ['не реализовано'] };
}
