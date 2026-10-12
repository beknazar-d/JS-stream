// Какой тип поля выбрать под данные из заявки.
const typeFor = {
  email: "email",
  phone: "tel",
  quantity: "number",
  deliveryDate: "date",
  address: "text",
  comment: "textarea",
};

for (const field of ["phone", "quantity", "comment", "deliveryDate"]) {
  console.log(field + " -> " + typeFor[field]);
}
console.log("Полей с особым типом: " + Object.values(typeFor).filter((type) => type !== "text").length);
