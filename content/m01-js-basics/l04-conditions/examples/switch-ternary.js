// switch: готовый набор значений.
function statusText(status) {
  switch (status) {
    case "new":
      return "Новый";
    case "paid":
      return "Оплачен";
    case "shipped":
      return "Отправлен";
    default:
      return "Неизвестный статус";
  }
}

console.log(statusText("paid"));
console.log(statusText("lost"));

// Тернарный оператор: выбор из двух значений.
const isExpress = true;
const label = isExpress ? "Экспресс" : "Обычная";
console.log(label);

// switch с break и присваиванием.
let days;
switch ("B") {
  case "A":
    days = 1;
    break;
  case "B":
    days = 2;
    break;
  default:
    days = 9;
}
console.log(days);
