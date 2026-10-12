// Упрощённая проверка поля, как это делает браузер по атрибутам required, min и max.
function check(field) {
  if (field.required && field.value === "") {
    return "Заполните это поле";
  }
  if (field.value === "") {
    return "ok";
  }
  const number = Number(field.value);
  if (field.min !== undefined && number < field.min) {
    return "Значение не меньше " + field.min;
  }
  if (field.max !== undefined && number > field.max) {
    return "Значение не больше " + field.max;
  }
  return "ok";
}

const units = { required: true, min: 1, max: 5 };

console.log(check({ ...units, value: "" }));
console.log(check({ ...units, value: "0" }));
console.log(check({ ...units, value: "3" }));
console.log(check({ ...units, value: "6" }));
console.log(check({ value: "" }));
