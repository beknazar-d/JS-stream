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
    case "paid":
      text = "Оплачен";
    case "shipped":
      text = "Отправлен";
      break;
    default:
      text = "Неизвестный статус";
  }
  return text;
}

export function describeStock(stock) {
  if (stock === undefined || stock === null) {
    return "Нет данных";
  } else if (stock === 0) {
    return "Нет в наличии";
  } else {
    return "В наличии: " + stock;
  }
}
