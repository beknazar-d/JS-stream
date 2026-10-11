const stock = { "RUN-42": 7, "SOCK-07": 0, "CAP-01": 15 };

console.log(Object.keys(stock));
console.log(Object.values(stock));
console.log(Object.entries(stock));

for (const sku of Object.keys(stock)) {
  console.log(sku + " -> " + stock[sku]);
}

// Есть ли поле? Значение 0 — это не «поля нет».
console.log("SOCK-07" in stock);
console.log(Object.hasOwn(stock, "GLOVE-03"));
console.log(stock["GLOVE-03"]);

// Имя поля может лежать в переменной.
const sku = "CAP-01";
console.log(stock[sku]);
