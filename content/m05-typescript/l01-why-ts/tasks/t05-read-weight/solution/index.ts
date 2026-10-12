export function readWeight(value: unknown): number {
  let weight = NaN;

  if (typeof value === "number") {
    weight = value;
  } else if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value)) {
    weight = Number(value);
  }

  if (!Number.isFinite(weight) || weight <= 0) {
    throw new Error("Вес должен быть положительным числом");
  }
  return weight;
}
