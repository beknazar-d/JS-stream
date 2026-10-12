const CART_KEY = 'cart';
const OPEN_KEY = 'cart-open';

const catalog = {};
document.querySelectorAll('#products li').forEach((li) => {
  catalog[li.dataset.id] = { title: li.dataset.title, price: Number(li.dataset.price) };
});

function loadCart() {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(CART_KEY));
  } catch {
    return [];
  }
  if (!Array.isArray(data)) return [];
  return data.filter(
    (item) => item && Number.isInteger(item.id) && Number.isInteger(item.qty) && item.qty > 0,
  );
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

let cart = loadCart();

const list = document.querySelector('#cart-items');

function render() {
  list.innerHTML = '';
  let units = 0;
  let total = 0;
  for (const item of cart) {
    const product = catalog[item.id];
    if (!product) continue;
    units += item.qty;
    total += product.price * item.qty;

    const row = document.createElement('li');
    row.dataset.id = item.id;
    const title = document.createElement('span');
    title.textContent = product.title;
    const qty = document.createElement('span');
    qty.className = 'qty';
    qty.textContent = item.qty;
    row.append(title, makeButton('dec', '−', 'Меньше'), qty, makeButton('inc', '+', 'Больше'), makeButton('remove', '×', 'Убрать'));
    list.append(row);
  }
  document.querySelector('#cart-count').textContent = units;
  document.querySelector('#cart-total').textContent = total;
  document.querySelector('#cart-empty').hidden = units > 0;
}

function makeButton(className, text, label) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = text;
  button.setAttribute('aria-label', label);
  return button;
}

function change(cartUpdater) {
  cart = cartUpdater(cart);
  saveCart(cart);
  render();
}

document.querySelector('#products').addEventListener('click', (event) => {
  const button = event.target.closest('.add');
  if (!button) return;
  const id = Number(button.closest('li').dataset.id);
  change((current) => {
    const found = current.find((item) => item.id === id);
    if (found) return current.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item));
    return [...current, { id, qty: 1 }];
  });
});

list.addEventListener('click', (event) => {
  const row = event.target.closest('li');
  if (!row) return;
  const id = Number(row.dataset.id);
  if (event.target.closest('.inc')) {
    change((current) => current.map((item) => (item.id === id ? { ...item, qty: item.qty + 1 } : item)));
  } else if (event.target.closest('.dec')) {
    // Допущение: при количестве 1 «минус» убирает позицию.
    change((current) =>
      current.flatMap((item) => {
        if (item.id !== id) return [item];
        return item.qty > 1 ? [{ ...item, qty: item.qty - 1 }] : [];
      }),
    );
  } else if (event.target.closest('.remove')) {
    change((current) => current.filter((item) => item.id !== id));
  }
});

const panel = document.querySelector('#cart-panel');
const toggle = document.querySelector('#cart-toggle');

function setOpen(open) {
  panel.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  sessionStorage.setItem(OPEN_KEY, open ? '1' : '0');
}

toggle.addEventListener('click', () => setOpen(panel.hidden));

setOpen(sessionStorage.getItem(OPEN_KEY) === '1');
render();
