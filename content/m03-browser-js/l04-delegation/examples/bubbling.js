// Модель всплытия: событие идёт от целевого элемента вверх по родителям.
function node(name, parent = null) {
  return { name, parent, handlers: [] };
}

function dispatch(target, type) {
  let stopped = false;
  const event = {
    type,
    target,
    currentTarget: null,
    stopPropagation() {
      stopped = true;
    },
  };
  for (let current = target; current && !stopped; current = current.parent) {
    event.currentTarget = current;
    for (const handler of current.handlers) handler(event);
  }
}

const list = node('список');
const row = node('строка', list);
const button = node('кнопка', row);
const icon = node('значок', button);

function show(event) {
  console.log('сработал ' + event.currentTarget.name + ', нажали на ' + event.target.name);
}
list.handlers.push(show);
row.handlers.push(show);
button.handlers.push(show);

dispatch(icon, 'click');
