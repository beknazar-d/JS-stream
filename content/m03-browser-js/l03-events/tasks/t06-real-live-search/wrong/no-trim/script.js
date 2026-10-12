const form = document.querySelector('#search-form');
const input = document.querySelector('#q');
const status = document.querySelector('#status');
const empty = document.querySelector('.empty');
const items = document.querySelectorAll('#results li');

function applyFilter(raw) {
  const query = raw.toLowerCase();
  let found = 0;

  for (const item of items) {
    const match = item.textContent.toLowerCase().includes(query);
    item.hidden = !match;
    if (match) found += 1;
  }

  status.textContent = `Найдено: ${found}`;
  empty.hidden = found > 0;
}

function reset() {
  input.value = '';
  applyFilter('');
}

input.addEventListener('input', () => {
  applyFilter(input.value);
});

input.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') reset();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
});

document.querySelector('#reset').addEventListener('click', (event) => {
  event.preventDefault();
  reset();
});
