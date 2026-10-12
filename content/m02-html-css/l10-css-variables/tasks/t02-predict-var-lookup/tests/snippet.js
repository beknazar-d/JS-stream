// Модель: как браузер ищет значение переменной CSS.
// Сначала у самого элемента, потом у родителя, у родителя родителя и так до корня.
const page = { vars: { '--gap': '16px', '--color': 'navy' }, parent: null };
const sidebar = { vars: { '--accent': 'red' }, parent: page };
const card = { vars: { '--color': 'darkgreen' }, parent: page };
const badge = { vars: {}, parent: card };
const footer = { vars: { '--gap': '8px' }, parent: page };

function resolve(element, name, fallback) {
  for (let node = element; node; node = node.parent) {
    if (name in node.vars) return node.vars[name];
  }
  return fallback ?? 'invalid';
}

console.log(resolve(badge, '--color'));
console.log(resolve(badge, '--gap'));
console.log(resolve(footer, '--gap'));
console.log(resolve(footer, '--color'));
console.log(resolve(card, '--accent'));
console.log(resolve(footer, '--shadow', 'none'));
console.log(resolve(page, '--gap', '4px'));
