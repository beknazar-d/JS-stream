export function deliveryDays(zone) {
  let days;
  switch (zone) {
    case 'A':
      days = 1;
    case 'B':
      days = 2;
    case 'C':
      days = 4;
    default:
      days = 7;
  }
  return days;
}

export function stockLabel(stock) {
  if (stock === 0) {
    return 'Нет в наличии';
  } else if (stock <= 5) {
    return 'Мало';
  } else {
    return 'В наличии';
  }
}

export function serviceName(isExpress) {
  return isExpress ? 'Экспресс' : 'Обычная';
}
