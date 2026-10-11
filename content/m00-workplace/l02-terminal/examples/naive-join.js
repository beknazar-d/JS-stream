// Просто склеить текущую папку и относительный путь нельзя:
// две точки остаются в строке и ничего не «поднимают».
const cwd = "/home/anna/shop/src";

console.log(cwd + "/" + "orders.js");
console.log(cwd + "/" + "../docs");
console.log(cwd + "/" + ".");

// Настоящий терминал упростит такой путь до /home/anna/shop/docs.
const parts = "/home/anna/shop/src/../docs".split("/");
console.log(parts.length);
console.log(parts[5]);
