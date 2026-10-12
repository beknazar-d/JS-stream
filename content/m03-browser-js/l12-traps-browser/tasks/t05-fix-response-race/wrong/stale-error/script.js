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

let lastId = 0;

async function selectCategory(slug) {
  const id = ++lastId;
  tabs.forEach((tab) => {
    tab.setAttribute('aria-pressed', String(tab.dataset.category === slug));
  });
  statusLine.textContent = 'Загрузка…';

  try {
    const response = await fetch('/api/products?category=' + slug);
    if (!response.ok) throw new Error('HTTP ' + response.status);
    const items = await response.json();
    if (id !== lastId) return;
    renderProducts(items);
    statusLine.textContent = '';
  } catch (error) {
    productList.replaceChildren();
    statusLine.textContent = 'Не удалось загрузить';
  }
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => selectCategory(tab.dataset.category));
});
