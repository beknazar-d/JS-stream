export interface Courier {
  id: number;
  name: string;
  phone: string | null;
}

export function isCourier(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'number' &&
    'name' in value &&
    typeof value.name === 'string' &&
    value.name.length > 0 &&
    'phone' in value &&
    (value.phone === null || typeof value.phone === 'string')
  );
}

export function courierLabel(json: string): string {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return 'Курьер не определён';
  }
  if (!isCourier(data)) return 'Курьер не определён';
  const courier = data as Courier;
  return `${courier.name} (${courier.phone ?? 'телефон не указан'})`;
}
