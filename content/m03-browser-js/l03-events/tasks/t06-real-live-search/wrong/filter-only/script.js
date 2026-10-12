const input = document.querySelector('#q');
const status = document.querySelector('#status');
const empty = document.querySelector('.empty');
const items = document.querySelectorAll('#results li');

function applyFilter(raw) {
  const query = raw.trim().toLowerCase();
  let found = 0;

  for (const item of items) {
    const match = item.textContent.toLowerCase().includes(query);
    item.hidden = !match;
    if (match) found += 1;
  }

  status.textContent = `Найдено: ${found}`;
  empty.hidden = found > 0;
}

input.addEventListener('input', () => {
  applyFilter(input.value);
});
