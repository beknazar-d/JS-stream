// Каждая строка git status --short — это два символа кода, пробел и имя файла.
const line = " M src/cart.js";

console.log("[" + line.slice(0, 2) + "]");
console.log(line.slice(3));

// Первый символ кода — индекс (то, что войдёт в коммит),
// второй — рабочая папка (то, что изменено, но ещё не добавлено).
const both = "MM src/stock.js";
console.log("в индексе: " + both[0]);
console.log("в папке: " + both[1]);

// Новый файл, который Git пока не отслеживает, помечен двумя вопросами.
console.log("?? notes.txt".startsWith("??"));
