// Имя на латинице, camelCase, понятный смысл.
const freeShippingFrom = 5000;
const maxItemsPerOrder = 20;

// Регистр важен: Stock и stock разные.
let stock = 10;
let Stock = 99;
console.log(stock);
console.log(Stock);

// let без значения хранит undefined.
let note;
console.log(note);

// typeof не падает на несуществующем имени.
console.log(typeof missingName);
console.log(freeShippingFrom + maxItemsPerOrder);
