// closest поднимается от элемента к родителям и возвращает первый подходящий.
function closest(element, className) {
  for (let current = element; current; current = current.parent) {
    if (current.classes.includes(className)) return current;
  }
  return null;
}

const list = { name: 'список', classes: ['cart'], parent: null };
const row = { name: 'строка', classes: ['cart-row'], parent: list };
const button = { name: 'кнопка', classes: ['remove'], parent: row };
const icon = { name: 'значок', classes: ['icon'], parent: button };
const title = { name: 'название', classes: ['title'], parent: row };

console.log(closest(icon, 'remove').name);
console.log(closest(button, 'remove').name);
console.log(closest(icon, 'cart-row').name);
console.log(closest(title, 'remove'));
