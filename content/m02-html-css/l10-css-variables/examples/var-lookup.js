// Как браузер ищет значение var(--имя): у элемента, потом у родителей вверх.
const root = { name: "html", vars: { "--color-brand": "green", "--space-md": "16px" }, parent: null };
const promo = { name: "section.promo", vars: { "--color-brand": "crimson" }, parent: root };
const button = { name: "button", vars: {}, parent: promo };
const footer = { name: "footer", vars: {}, parent: root };

function resolve(element, name, fallback) {
  for (let node = element; node; node = node.parent) {
    if (name in node.vars) return node.vars[name];
  }
  return fallback;
}

console.log("кнопка в акции:", resolve(button, "--color-brand"));
console.log("кнопка в подвале:", resolve(footer, "--color-brand"));
console.log("отступ кнопки:", resolve(button, "--space-md"));
console.log("тень без переменной:", resolve(button, "--shadow", "none"));
console.log("тень без запасного:", resolve(button, "--shadow"));
