// Путь — это строка. Папки в ней разделены косой чертой.
const folder = "/home/anna/shop/src";
const parts = folder.split("/");

console.log(parts.length);
console.log(parts[1]);
console.log(parts[parts.length - 1]);
console.log(parts[0] === "");
