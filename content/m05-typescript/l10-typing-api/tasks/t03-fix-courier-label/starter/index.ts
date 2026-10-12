export interface Courier {
  id: number;
  name: string;
  phone: string | null;
}

export function isCourier(value: unknown): value is Courier {
  return typeof value === 'object';
}

export function courierLabel(json: string): string {
  const courier = JSON.parse(json) as Courier;
  return `${courier.name} (${courier.phone ?? 'телефон не указан'})`;
}
