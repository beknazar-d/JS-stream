export const zones: string[] = ["центр", "пригород", "область"];
export const baseRates: number[] = [150, 250, 400];

export function zoneIndex(zone: string): number {
  return zones.indexOf(zone);
}

export function deliveryPrice(zone: string, weightKg: string, express: boolean): number {
  const index = zoneIndex(zone);
  if (index === -1) {
    throw new Error("Неизвестная зона: " + zone);
  }
  const extraKg = Math.max(0, Math.ceil(weightKg - 10));
  const price = baseRates[index] + extraKg * 20;
  return express ? Math.round(price * 1.5) : price;
}

export function totalForOrders(prices: number[]): number {
  let sum = 0;
  for (const price of prices) {
    sum = sum + price;
  }
  return sum;
}

export function receipt(orderId: number, prices: number[], currency: string): string {
  return "Заказ " + orderId + ": " + totalForOrders(prices) + " " + currency;
}
