export function shippingCost(weightKg, distanceKm, express = false) {
  if (!Number.isInteger(weightKg) || weightKg < 1) {
    return null;
  }
  if (typeof distanceKm !== 'number' || Number.isNaN(distanceKm) || distanceKm < 0) {
    return null;
  }

  let cost = 200;
  if (weightKg > 3) {
    cost += (weightKg - 3) * 40;
  }
  if (distanceKm > 100) {
    cost += 300;
  }
  if (express) {
    cost = cost * 2;
  }
  return cost;
}
