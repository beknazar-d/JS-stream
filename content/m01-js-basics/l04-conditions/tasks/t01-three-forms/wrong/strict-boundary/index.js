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
  if (stock === 0) {
    return 'Нет в наличии';
  } else if (stock < 5) {
    return 'Мало';
  } else {
    return 'В наличии';
  }
}

export function serviceName(isExpress) {
  return isExpress ? 'Экспресс' : 'Обычная';
}
