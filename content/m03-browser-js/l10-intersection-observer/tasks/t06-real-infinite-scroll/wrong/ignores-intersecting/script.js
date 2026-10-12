const PAGE_SIZE = 6;

const list = document.querySelector('#results');
const status = document.querySelector('#status');
const end = document.querySelector('#end');
const sentinel = document.querySelector('#sentinel');

function appendItems(items) {
  for (const item of items) {
    const li = document.createElement('li');
    li.dataset.id = item.id;
    li.textContent = `${item.title}, ${item.price} ₽`;
    list.append(li);
  }
}

let nextPage = 1;
let loading = false;
let hasMore = true;
let observer = null;

async function loadNextPage() {
  if (loading || !hasMore) return;
  loading = true;
  status.textContent = 'Загрузка…';
  status.hidden = false;
  try {
    const response = await fetch(`/api/products?page=${nextPage}&limit=${PAGE_SIZE}`);
    if (!response.ok) throw new Error(`Ошибка ${response.status}`);
    const data = await response.json();
    appendItems(data.items);
    hasMore = data.page < data.totalPages;
    nextPage = data.page + 1;
    status.hidden = true;
  } catch (error) {
    // Допущение: при ошибке показываем сообщение, следующая прокрутка повторит попытку.
    status.textContent = 'Не удалось загрузить товары. Прокрутите ещё раз.';
    status.hidden = false;
  } finally {
    loading = false;
  }

  if (!hasMore) {
    end.hidden = false;
    observer?.unobserve(sentinel);
  } else if (observer) {
    // Если сторож всё ещё на экране, наблюдатель сообщит о нём заново.
    observer.unobserve(sentinel);
    observer.observe(sentinel);
  }
}

function initInfiniteScroll() {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.length) loadNextPage();
    },
    { rootMargin: '300px 0px' },
  );
  observer.observe(sentinel);
}

loadNextPage();
initInfiniteScroll();
