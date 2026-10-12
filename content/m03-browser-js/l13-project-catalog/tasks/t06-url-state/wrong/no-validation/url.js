// url.js: перевод между состоянием каталога и адресом страницы.
// Порядок параметров в адресе: q, category, sort, page. Значения по умолчанию в адрес не пишутся.

const DEFAULT_STATE = { q: '', category: '', sort: 'popular', page: 1 };
const SORTS = ['popular', 'price-asc', 'price-desc'];
const CATEGORIES = ['kitchen', 'cleaning', 'climate', 'laundry'];

// '?q=чайник&page=2' -> { q: 'чайник', category: '', sort: 'popular', page: 2 }
// Неверные значения заменяются значениями по умолчанию.
function parseState(search) {
  const params = new URLSearchParams(search);
  return {
    q: params.get('q') || '',
    category: params.get('category') || '',
    sort: params.get('sort') || 'popular',
    page: Number(params.get('page')) || 1,
  };
}

// { q: 'чайник', category: '', sort: 'popular', page: 2 } -> '?q=%D1%87...&page=2'
// Для состояния по умолчанию возвращает пустую строку.
function buildSearch(state) {
  const params = new URLSearchParams();
  if (state.q) params.set('q', state.q);
  if (state.category) params.set('category', state.category);
  if (state.sort !== 'popular') params.set('sort', state.sort);
  if (state.page > 1) params.set('page', String(state.page));
  const text = params.toString();
  return text ? '?' + text : '';
}
