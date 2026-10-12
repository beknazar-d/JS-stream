const PAGE_SIZE = 6;

const list = document.querySelector('#results');
const status = document.querySelector('#status');
const end = document.querySelector('#end');
const sentinel = document.querySelector('#sentinel');

// Добавляет товары в конец списка (готово).
function appendItems(items) {
  for (const item of items) {
    const li = document.createElement('li');
    li.dataset.id = item.id;
    li.textContent = `${item.title}, ${item.price} ₽`;
    list.append(li);
  }
}

// TODO: состояние (номер страницы, загрузка идёт, есть ли ещё страницы).

// TODO: загрузить следующую страницу и добавить товары.
async function loadNextPage() {}

// TODO: наблюдатель за #sentinel с запасом 300px.
function initInfiniteScroll() {}

loadNextPage();
initInfiniteScroll();
