export interface Cargo {
  places: number;
  weightKg: number;
}

export interface PickupPoint {
  city: string;
  street: string;
  floor?: number;
  intercom?: string;
}

export interface PickupRequest {
  id: number;
  company: string;
  pickup: PickupPoint;
  contacts: string[];
  cargo: Cargo;
  comment?: string;
}

export function pickupSummary(request: PickupRequest): string {
  const { city, street, floor, intercom } = request.pickup;
  let address = `${city}, ${street}`;
  if (floor !== undefined) {
    address = `${address}, этаж ${floor}`;
  }
  if (intercom !== undefined) {
    address = `${address}, домофон ${intercom}`;
  }
  const { places, weightKg } = request.cargo;
  return `Заявка №${request.id} (${request.company}): ${address}; мест: ${places}, вес: ${weightKg} кг`;
}

export function totalWeight(requests: PickupRequest[]): number {
  return 0;
}
