const items = [
  { id: 1, title: 'Электрический чайник Domo K-17', qty: 1 },
  { id: 2, title: 'Тостер Vento T-2', qty: 2 },
];

const list = document.querySelector('#cart');
const totalLine = document.querySelector('#total');
const refreshButton = document.querySelector('#refresh');

function rowHtml(item) {
  return (
    '<li data-id="' + item.id + '">' +
    '<span class="title">' + item.title + '</span>' +
    '<button type="button" data-action="dec" aria-label="Уменьшить">−</button>' +
    '<span class="qty">' + item.qty + '</span>' +
    '<button type="button" data-action="inc" aria-label="Увеличить">+</button>' +
    '</li>'
  );
}

function render() {
  list.innerHTML = items.map(rowHtml).join('');
  totalLine.textContent = 'Всего штук: ' + items.reduce((sum, item) => sum + item.qty, 0);

  list.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;
    const id = Number(button.closest('li').dataset.id);
    const item = items.find((entry) => entry.id === id);
    if (button.dataset.action === 'inc') item.qty += 1;
    if (button.dataset.action === 'dec' && item.qty > 1) item.qty -= 1;
    render();
  });
}

refreshButton.addEventListener('click', render);

render();
