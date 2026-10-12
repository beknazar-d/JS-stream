export function readWeight(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return value;
  }
  throw new Error("Вес должен быть положительным числом");
}
