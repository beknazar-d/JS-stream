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
  if (controller) controller.abort();

  if (text === '') {
    controller = undefined;
    renderResults([]);
    statusLine.textContent = '';
    retryButton.hidden = true;
    return;
  }

  controller = new AbortController();

  try {
    const response = await fetch('/api/search?q=' + encodeURIComponent(text), { signal: controller.signal });
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const items = await response.json();
    renderResults(items);
  } catch (error) {
    if (error.name === 'AbortError') return;
    renderResults([]);
  }
}

const debouncedLoad = debounce(loadResults, 300);

search.addEventListener('input', () => {
  debouncedLoad(search.value.trim());
});

retryButton.addEventListener('click', () => {
  loadResults(lastText);
});
