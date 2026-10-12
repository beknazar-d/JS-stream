// Модель всплытия: событие идёт от целевого элемента вверх по родителям.
function node(name, parent = null) {
  return { name, parent, handlers: [] };
}

function dispatch(target) {
  let stopped = false;
  const event = {
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

const list = node('list');
const item = node('item', list);
const button = node('button', item);
const icon = node('icon', button);

function show(event) {
  console.log(event.currentTarget.name + ' <- ' + event.target.name);
}

list.handlers.push(show);
item.handlers.push(show);
button.handlers.push(show);

dispatch(icon);
console.log('---');

button.handlers.push((event) => {
  console.log('stop on ' + event.currentTarget.name);
  event.stopPropagation();
});
dispatch(icon);
dispatch(item);
