const list = document.querySelector('.cart-list');
const total = document.querySelector('.cart-total');
const items = [];

function renderAll() {
  list.replaceChildren();
  for (const item of items) {
    const row = document.createElement('li');
    row.className = 'cart-row';
    row.dataset.id = item.id;

    const title = document.createElement('span');
    title.className = 'cart-row__title';
    title.textContent = item.title;

    const qty = document.createElement('span');
    qty.className = 'cart-row__qty';
    qty.textContent = '× ' + item.qty;

    row.append(title, qty);
    list.append(row);
  }
  total.textContent = 'Позиций: ' + list.children.length;
}

function addRow(item) {
  items.push(item);
  renderAll();
}

addRow({ id: 'k200', title: 'Чайник K-200', qty: 1 });
addRow({ id: 'b50', title: 'Блендер B-50', qty: 2 });
