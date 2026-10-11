export function isSoldOut(stock) {
  if (stock === 0) {
    return true;
  }
  return false;
}

export function statusText(status) {
  let text;
  switch (status) {
    case "new":
      text = "Новый";
      break;
    case "paid":
      text = "Оплачен";
      break;
    case "shipped":
      text = "Отправлен";
      break;
    default:
      text = "Неизвестный статус";
  }
  return text;
}

export function describeStock(stock) {
  if (stock) {
    return "В наличии: " + stock;
  } else {
    return "Нет данных";
  }
}
