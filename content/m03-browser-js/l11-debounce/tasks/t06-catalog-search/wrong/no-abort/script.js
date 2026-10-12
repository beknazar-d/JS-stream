const search = document.querySelector('#search');
const results = document.querySelector('#results');
const statusLine = document.querySelector('#status');
const retryButton = document.querySelector('#retry');

function formatPrice(rubles) {
  return new Intl.NumberFormat('ru-RU').format(rubles) + ' ₽';
}

function renderResults(items) {
  results.replaceChildren(
    ...items.map((item) => {
      const li = document.createElement('li');
      li.textContent = item.title + ' — ' + formatPrice(item.price);
      return li;
    }),
  );
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

let controller;
let lastText = '';

async function loadResults(text) {
  lastText = text;

  if (text === '') {
    controller = undefined;
    renderResults([]);
    statusLine.textContent = '';
    retryButton.hidden = true;
    return;
  }

  statusLine.textContent = 'Загрузка…';
  retryButton.hidden = true;

  try {
    const response = await fetch('/api/search?q=' + encodeURIComponent(text));
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const items = await response.json();
    renderResults(items);
    statusLine.textContent = items.length === 0 ? 'Ничего не найдено' : '';
  } catch (error) {
    if (error.name === 'AbortError') return;
    renderResults([]);
    statusLine.textContent = 'Не удалось загрузить результаты';
    retryButton.hidden = false;
  }
}

const debouncedLoad = debounce(loadResults, 300);

search.addEventListener('input', () => {
  debouncedLoad(search.value.trim());
});

retryButton.addEventListener('click', () => {
  loadResults(lastText);
});
