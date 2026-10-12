export const SHIPMENT_STATUSES = ['created', 'in_transit', 'delivered', 'cancelled'] as const;
export type ShipmentStatus = (typeof SHIPMENT_STATUSES)[number];

// Допишите сигнатуру и тело. Сейчас функция всегда отвечает «нет».
export function isShipmentStatus(value: unknown) {
  return false;
}
