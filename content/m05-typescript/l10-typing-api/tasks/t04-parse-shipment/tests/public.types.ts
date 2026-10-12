import { parseShipment, type Result, type Shipment } from './index.js';

type cases = [
  Expect<Equal<ReturnType<typeof parseShipment>, Result<Shipment, string[]>>>,
  Expect<Equal<Parameters<typeof parseShipment>, [raw: unknown]>>,
];

const result = parseShipment({});

// @ts-expect-error значение доступно только после проверки result.ok
const unsafe = result.value;

// @ts-expect-error ошибка доступна только в ветке ok: false
const unsafeError = result.error;

function weightOf(value: unknown): number | null {
  const parsed = parseShipment(value);
  return parsed.ok ? parsed.value.weightKg : null;
}
