export function deliveryPrice(zone, weightKg, orderSum) {
  if (!(weightKg > 0)) {
    return null;
  }

  let base;
  switch (zone) {
    case 'A':
      base = 200;
      break;
    case 'B':
      base = 350;
      break;
    case 'C':
      base = 600;
      break;
    default:
      return null;
  }

  if (orderSum >= 5000) {
    return 0;
  }
  return base;
}
