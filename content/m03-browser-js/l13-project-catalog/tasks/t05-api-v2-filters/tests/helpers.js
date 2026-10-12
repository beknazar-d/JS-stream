// Общие помощники тестов каталога «Домотеки».
export const cards = () => $$('#grid .card');
export const titles = () => $$('#grid .card__title').map((el) => el.textContent);
export const strip = (text) => text.replace(/\s/g, '');

// Цена в карточке в рублях: «2 990 ₽» или «2 990,00 ₽» дают 2990; иначе NaN.
export function priceOf(card) {
  const match = strip(card.querySelector('.card__price').textContent).replace('₽', '').match(/^(\d+)(?:,00)?$/);
  return match ? Number(match[1]) : NaN;
}

// Ждём, пока все запросы к серверу завершатся, и ещё немного на отрисовку.
export async function settle() {
  await waitFor(() => shopServer.pending === 0, 3000);
  await wait(40);
}

// Эталонный ответ сервера: что должно быть на странице.
export function reference({ q = '', category = '', sort = 'popular', page = 1, limit = 6 } = {}) {
  let list = window.PRODUCTS.slice();
  const text = q.trim().toLowerCase();
  if (text) list = list.filter((p) => p.title.toLowerCase().includes(text));
  if (category) list = list.filter((p) => p.category === category);
  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  return {
    items: list.slice((page - 1) * limit, page * limit),
    total: list.length,
    pages: Math.max(1, Math.ceil(list.length / limit)),
  };
}

export const expectedTitles = (options) => reference(options).items.map((p) => p.title);

// Часть адреса после «?» вместе со знаком вопроса (или пустая строка).
export function searchPart() {
  const url = currentUrl();
  const index = url.indexOf('?');
  return index === -1 ? '' : url.slice(index);
}

export const lastCall = () => shopServer.calls[shopServer.calls.length - 1];
