export const SHIPMENT_STATUSES = ['created', 'in_transit', 'delivered', 'cancelled'] as const;
export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

export function isShipmentStatus(value: unknown): value is ShipmentStatus {
  return (SHIPMENT_STATUSES as readonly string[]).includes(String(value));
}
