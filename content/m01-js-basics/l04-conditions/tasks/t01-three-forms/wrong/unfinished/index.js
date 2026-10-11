export function deliveryDays(zone) {
  switch (zone) {
    case 'A':
      return 1;
    case 'B':
      return 2;
    case 'C':
      return 4;
    default:
      return 7;
  }
}

export function stockLabel(stock) {
  // ваш код
}

export function serviceName(isExpress) {
  // ваш код
}
