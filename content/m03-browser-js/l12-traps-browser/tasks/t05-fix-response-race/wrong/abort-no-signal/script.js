const tabs = document.querySelectorAll('.tab');
const statusLine = document.querySelector('#status');
const productList = document.querySelector('#products');

function renderProducts(items) {
  productList.replaceChildren(
    ...items.map((item) => {
      const li = document.createElement('li');
      li.textContent = item.title;
      return li;
    }),
  );
}

let controller;

async function selectCategory(slug) {
  tabs.forEach((tab) => {
    tab.setAttribute('aria-pressed', String(tab.dataset.category === slug));
  });
  statusLine.textContent = 'Загрузка…';

  if (controller) controller.abort();
  controller = new AbortController();

  try {
    const response = await fetch('/api/products?category=' + slug);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const items = await response.json();
    renderProducts(items);
    statusLine.textContent = '';
  } catch (error) {
    if (error.name === 'AbortError') return;
    productList.replaceChildren();
    statusLine.textContent = 'Не удалось загрузить';
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => selectCategory(tab.dataset.category));
});
