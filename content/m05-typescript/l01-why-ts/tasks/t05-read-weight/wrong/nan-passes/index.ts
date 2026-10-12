export function readWeight(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string" && /^\d+(\.\d+)?$/.test(value)) {
    return Number(value);
  }
  throw new Error("Вес должен быть положительным числом");
}
