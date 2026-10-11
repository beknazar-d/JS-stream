// Строка стектрейса — обычный текст. Её можно разобрать на части.
const frame = "    at parseWeight (file:///home/anna/shop/src/delivery.js:2:22)";

const open = frame.indexOf("(");
const place = frame.slice(open + 1, -1);
console.log(place);

const parts = place.split(":");
console.log(parts.length);
console.log("строка " + parts[parts.length - 2]);
console.log("столбец " + parts[parts.length - 1]);
