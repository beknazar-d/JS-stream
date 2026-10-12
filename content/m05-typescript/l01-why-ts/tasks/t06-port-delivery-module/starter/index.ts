// Файл перенесён из JavaScript как есть. Допишите типы, логику не меняйте.
export const zones = ["центр", "пригород", "область"];
export const baseRates = [150, 250, 400];

export function zoneIndex(zone) {
  return zones.indexOf(zone);
}

export function deliveryPrice(zone, weightKg, express) {
  const index = zoneIndex(zone);
  if (index === -1) {
    throw new Error("Неизвестная зона: " + zone);
  }
  const extraKg = Math.max(0, Math.ceil(weightKg - 10));
  const price = baseRates[index] + extraKg * 20;
  return express ? Math.round(price * 1.5) : price;
}

export function totalForOrders(prices) {
  let sum = 0;
  for (const price of prices) {
    sum = sum + price;
  }
  return sum;
}

export function receipt(orderId, prices, currency) {
  return "Заказ " + orderId + ": " + totalForOrders(prices) + " " + currency;
}
