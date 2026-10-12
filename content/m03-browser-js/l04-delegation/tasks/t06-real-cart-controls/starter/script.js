function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

const cart = [
  { id: 'k200', title: 'Чайник K-200', price: 2990, qty: 1 },
  { id: 'b50', title: 'Блендер B-50', price: 4990, qty: 2 },
];

const list = document.querySelector('#cart');
const total = document.querySelector('#total');
const empty = document.querySelector('.empty');

function makeButton(action, label, symbol) {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.action = action;
  button.setAttribute('aria-label', label);
  const icon = document.createElement('span');
  icon.className = 'icon';
  icon.textContent = symbol;
  button.append(icon);
  return button;
}

function render() {
  list.replaceChildren();
  let sum = 0;

  for (const item of cart) {
    const row = document.createElement('li');
    row.className = 'cart-row';
    row.dataset.id = item.id;

    const title = document.createElement('span');
    title.className = 'cart-row__title';
    title.textContent = item.title;

    const qty = document.createElement('span');
    qty.className = 'cart-row__qty';
    qty.textContent = String(item.qty);

    row.append(
      title,
      makeButton('dec', 'Уменьшить', '−'),
      qty,
      makeButton('inc', 'Увеличить', '+'),
      makeButton('remove', 'Удалить', '×'),
    );
    list.append(row);
    sum += item.price * item.qty;
  }

  empty.hidden = cart.length > 0;
  total.textContent = `Итого: ${formatPrice(sum)}`;
}

render();

// Подключите обработчик клика на #cart и напишите addToCart.
