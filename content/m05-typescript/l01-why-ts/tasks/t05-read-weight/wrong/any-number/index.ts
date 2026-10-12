export function readWeight(value: any): number {
  const weight = Number(value);
  if (Number.isNaN(weight) || weight <= 0) {
    throw new Error("Вес должен быть положительным числом");
  }
  return weight;
}
