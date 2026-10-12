// Какую долю страницы скринридер может «понять» без классов.
const tags = ["header", "nav", "main", "div", "div", "article", "div", "footer"];
const landmarks = ["header", "nav", "main", "aside", "footer", "article", "section"];

const known = tags.filter((tag) => landmarks.includes(tag));
console.log("Всего блоков: " + tags.length);
console.log("Со смыслом: " + known.length);
console.log("Просто div: " + (tags.length - known.length));
console.log("Доля осмысленных: " + Math.round((known.length / tags.length) * 100) + "%");
