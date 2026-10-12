// url.js: перевод между состоянием каталога и адресом страницы.
// Порядок параметров в адресе: q, category, sort, page. Значения по умолчанию в адрес не пишутся.

const DEFAULT_STATE = { q: '', category: '', sort: 'popular', page: 1 };
const SORTS = ['popular', 'price-asc', 'price-desc'];
const CATEGORIES = ['kitchen', 'cleaning', 'climate', 'laundry'];

// '?q=чайник&page=2' -> { q: 'чайник', category: '', sort: 'popular', page: 2 }
// Неверные значения (page=abc, sort=hack, неизвестная категория) заменяются значениями по умолчанию.
function parseState(search) {
  // Ваш код здесь.
  return { ...DEFAULT_STATE };
}

// { q: 'чайник', category: '', sort: 'popular', page: 2 } -> '?q=%D1%87...&page=2'
// Для состояния по умолчанию возвращает пустую строку.
function buildSearch(state) {
  // Ваш код здесь.
  return '';
}
