// Поля формы заказа: что видит браузер при отправке.
const fields = [
  { name: "email", value: "anna@example.ru", disabled: false },
  { name: "qty", value: "3", disabled: false },
  { name: "", value: "ignored", disabled: false },
  { name: "promo", value: "SALE10", disabled: true },
  { name: "comment", value: "", disabled: false },
];

// Правило браузера: без name и выключенные поля не отправляются.
function collect(list) {
  const result = {};
  for (const field of list) {
    if (field.name === "" || field.disabled) {
      continue;
    }
    result[field.name] = field.value;
  }
  return result;
}

const data = collect(fields);
console.log(Object.keys(data));
console.log(data.qty + 1);
console.log(Number(data.qty) + 1);
console.log(data.comment === "");
console.log("promo" in data);
console.log(typeof data.qty);
