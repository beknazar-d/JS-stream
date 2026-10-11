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

  let surcharge = 0;
  if (weightKg > 25) {
    surcharge = 300;
  } else if (weightKg > 10) {
    surcharge = 100;
  }
  return base + surcharge;
}
