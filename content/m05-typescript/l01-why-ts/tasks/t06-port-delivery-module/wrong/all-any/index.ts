export const zones: any = ["центр", "пригород", "область"];
export const baseRates: any = [150, 250, 400];

export function zoneIndex(zone: any): any {
  return zones.indexOf(zone);
}

export function deliveryPrice(zone: any, weightKg: any, express: any): any {
  const index = zoneIndex(zone);
  if (index === -1) {
    throw new Error("Неизвестная зона: " + zone);
  }
  const extraKg = Math.max(0, Math.ceil(weightKg - 10));
  const price = baseRates[index] + extraKg * 20;
  return express ? Math.round(price * 1.5) : price;
}

export function totalForOrders(prices: any): any {
  let sum = 0;
  for (const price of prices) {
    sum = sum + price;
  }
  return sum;
}

export function receipt(orderId: any, prices: any, currency: any): any {
  return "Заказ " + orderId + ": " + totalForOrders(prices) + " " + currency;
}
