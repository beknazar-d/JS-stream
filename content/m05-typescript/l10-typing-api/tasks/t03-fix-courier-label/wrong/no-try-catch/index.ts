export interface Courier {
  id: number;
  name: string;
  phone: string | null;
}

export function isCourier(value: unknown): value is Courier {
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
  const data: unknown = JSON.parse(json);
  if (!isCourier(data)) return 'Курьер не определён';
  return `${data.name} (${data.phone ?? 'телефон не указан'})`;
}
