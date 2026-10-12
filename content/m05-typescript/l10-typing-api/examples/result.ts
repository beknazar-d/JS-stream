type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function parseWeight(raw: unknown): Result<number, string> {
  const weight = typeof raw === 'string' ? Number(raw) : raw;
  if (typeof weight !== 'number' || Number.isNaN(weight)) {
    return { ok: false, error: `Вес не число: ${String(raw)}` };
  }
  if (weight <= 0) {
    return { ok: false, error: 'Вес должен быть больше нуля' };
  }
  return { ok: true, value: weight };
}

for (const raw of [2.5, '3.1', 'тяжёлая', -1]) {
  const result = parseWeight(raw);
  console.log(result.ok ? `${result.value} кг` : result.error);
}
