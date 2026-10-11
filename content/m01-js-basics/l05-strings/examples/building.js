// Телефон: убираем всё лишнее.
const rawPhone = "8 (999) 123-45-67";
const compact = rawPhone
  .replaceAll(" ", "")
  .replaceAll("(", "")
  .replaceAll(")", "")
  .replaceAll("-", "");
console.log(compact);
console.log("+7" + compact.slice(1));

// Номер заказа: число превращаем в строку и дополняем нулями.
const id = 42;
const label = "№" + String(id).padStart(6, "0");
console.log(label);

// Шаблонная строка.
const city = "Казань";
console.log(`Заказ ${label} едет в город ${city}. Итого: ${id * 2} руб.`);

// split и join: текст на части и обратно.
const address = "Москва, ул. Ленина, 5";
const parts = address.split(", ");
console.log(parts);
console.log(parts.join(" | "));
