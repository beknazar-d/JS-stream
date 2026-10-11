// Что браузер отдаёт из полей формы: всегда строки.
const fromForm = {
  email: "anna@example.ru",
  units: "3",
  zip: "012345",
  comment: "",
};

console.log(typeof fromForm.units);
console.log(fromForm.units + 1);
console.log(Number(fromForm.units) + 1);
console.log(Number(fromForm.zip));
console.log(fromForm.zip);
console.log(fromForm.comment === "");
