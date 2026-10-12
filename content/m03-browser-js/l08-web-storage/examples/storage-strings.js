// Модель хранилища: любое значение превращается в строку.
const storage = new Map();
const setItem = (key, value) => storage.set(key, String(value));
const getItem = (key) => (storage.has(key) ? storage.get(key) : null);

setItem("qty", 3);
console.log(typeof getItem("qty"));
console.log(getItem("qty") + 1);
console.log(Number(getItem("qty")) + 1);

// Объект так не сохранить: получится текст «[object Object]».
setItem("customer", { name: "Анна", city: "Казань" });
console.log(getItem("customer"));

// Через JSON структура сохраняется.
setItem("customer", JSON.stringify({ name: "Анна", city: "Казань" }));
console.log(getItem("customer"));
console.log(JSON.parse(getItem("customer")).city);

// Чего в JSON нет: даты становятся строками, undefined пропадает.
const saved = JSON.parse(JSON.stringify({ at: new Date(0), note: undefined, qty: 2 }));
console.log(typeof saved.at);
console.log("note" in saved);
