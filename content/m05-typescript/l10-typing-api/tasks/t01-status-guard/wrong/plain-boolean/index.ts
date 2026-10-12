export const SHIPMENT_STATUSES = ['created', 'in_transit', 'delivered', 'cancelled'] as const;
export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export function isShipmentStatus(value: unknown): boolean {
  return typeof value === 'string' && (SHIPMENT_STATUSES as readonly string[]).includes(value);
}
