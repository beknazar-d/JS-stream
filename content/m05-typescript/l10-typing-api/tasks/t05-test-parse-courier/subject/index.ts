export interface Courier {
  id: number;
  name: string;
  phone: string | null;
}

export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

export function parseCourier(raw: unknown): Result<Courier, string> {
  if (typeof raw !== 'object' || raw === null) {
    return { ok: false, error: 'курьер: ожидался объект' };
  }
  const data = raw as Record<string, unknown>;
  const { id, name, phone } = data;
  if (typeof id !== 'number' || !Number.isInteger(id) || id <= 0) {
    return { ok: false, error: 'id: ожидалось положительное целое число' };
  }
  if (typeof name !== 'string' || name.trim() === '') {
    return { ok: false, error: 'name: ожидалась непустая строка' };
  }
  if (phone !== null && typeof phone !== 'string') {
    return { ok: false, error: 'phone: ожидалась строка или null' };
  }
  return { ok: true, value: { id, name: name.trim(), phone } };
}
