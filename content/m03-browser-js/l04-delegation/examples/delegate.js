// Делегирование в модели: один обработчик на списке обслуживает и будущие строки.
const list = { name: 'список', classes: ['cart'], parent: null, rows: [] };

function closest(element, className) {
  for (let current = element; current; current = current.parent) {
    if (current.classes.includes(className)) return current;
  }
  return null;
}

function addRow(title) {
  const row = { name: title, classes: ['cart-row'], parent: list };
  const button = { name: 'кнопка', classes: ['remove'], parent: row };
  list.rows.push(row);
  return button;
}

// Единственный обработчик клика, подключён к списку.
function onListClick(target) {
  const button = closest(target, 'remove');
  if (!button) return;
  const row = closest(button, 'cart-row');
  list.rows.splice(list.rows.indexOf(row), 1);
}

const kettleButton = addRow('Чайник');
addRow('Блендер');
console.log(list.rows.length);

onListClick(kettleButton);
console.log(list.rows.length);

// Строку добавили уже после подключения обработчика.
const toasterButton = addRow('Тостер');
onListClick(toasterButton);
console.log(list.rows.map((row) => row.name).join(', '));

// Клик мимо кнопки ничего не удаляет.
onListClick(list.rows[0]);
console.log(list.rows.length);
