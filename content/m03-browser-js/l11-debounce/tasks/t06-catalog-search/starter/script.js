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

// Первая версия: запрос на каждую букву, без состояний и без отмены.
async function loadResults(text) {
  const response = await fetch('/api/search?q=' + encodeURIComponent(text));
  const items = await response.json();
  renderResults(items);
}

search.addEventListener('input', () => {
  loadResults(search.value);
});
