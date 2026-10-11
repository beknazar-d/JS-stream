// Простые правила .gitignore можно проверить обычными методами строк.
const rule = "*.log";
const fileName = "server.log";

// Правило «*.log» значит: имя заканчивается на .log
console.log(fileName.endsWith(rule.slice(1)));
console.log("changelog".endsWith(rule.slice(1)));

// Правило со слэшем в конце — это папка.
const folderRule = "node_modules/";
console.log(folderRule.endsWith("/"));
console.log(folderRule.slice(0, -1));

// Путь режем на части и ищем папку среди них.
const parts = "node_modules/express/index.js".split("/");
console.log(parts.includes("node_modules"));
