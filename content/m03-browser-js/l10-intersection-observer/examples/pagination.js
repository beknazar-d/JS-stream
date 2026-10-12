// Подгрузка порциями: номер страницы, флаг «идёт загрузка» и признак «есть ещё».
const ALL = Array.from({ length: 14 }, (_, i) => "Товар " + (i + 1));
const PAGE_SIZE = 6;

function fakeApi(page) {
  const items = ALL.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return { items, page, totalPages: Math.ceil(ALL.length / PAGE_SIZE) };
}

let nextPage = 1;
let loading = false;
let hasMore = true;
const shown = [];

function loadNextPage() {
  if (loading || !hasMore) return "пропуск";
  loading = true;
  const data = fakeApi(nextPage);
  shown.push(...data.items);
  hasMore = data.page < data.totalPages;
  nextPage = data.page + 1;
  loading = false;
  return "страница " + data.page + ", товаров на экране: " + shown.length;
}

console.log(loadNextPage());
console.log(loadNextPage());
console.log(loadNextPage());
// Колбэк сработал ещё раз после конца: запроса нет.
console.log(loadNextPage());
console.log(hasMore);
