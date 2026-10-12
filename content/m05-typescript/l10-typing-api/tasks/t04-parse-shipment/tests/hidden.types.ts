import { parseShipment, type Shipment } from './index.js';

function courierName(value: unknown): string | null {
  const parsed = parseShipment(value);
  if (!parsed.ok) return null;
  const shipment: Shipment = parsed.value;
  return shipment.courier === null ? null : shipment.courier.name;
}

function firstProblem(value: unknown): string | undefined {
  const parsed = parseShipment(value);
  return parsed.ok ? undefined : parsed.error[0];
}
