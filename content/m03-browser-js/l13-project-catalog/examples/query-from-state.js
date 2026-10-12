// Запрос к API собирается из состояния. Значения по умолчанию в запрос не попадают.
const PAGE_SIZE = 6;

function buildQuery(state) {
  const params = new URLSearchParams({ page: String(state.page), limit: String(PAGE_SIZE) });
  if (state.q) params.set('q', state.q);
  if (state.category) params.set('category', state.category);
  if (state.sort !== 'popular') params.set('sort', state.sort);
  return params.toString();
}

console.log(buildQuery({ q: '', category: '', sort: 'popular', page: 1 }));
console.log(buildQuery({ q: '', category: 'kitchen', sort: 'price-asc', page: 2 }));
console.log(buildQuery({ q: 'утюг', category: '', sort: 'popular', page: 1 }));
