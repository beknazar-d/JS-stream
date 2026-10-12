function readJson(key, fallback) {
  const value = JSON.parse(localStorage.getItem(key));
  return value === null ? fallback : value;
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

const titles = {};
document.querySelectorAll('#products li').forEach((li) => {
  titles[li.dataset.id] = li.dataset.title;
});

let favorites = readJson('favorites', []);

function renderFavorites() {
  document.querySelectorAll('#products li').forEach((li) => {
    const pressed = favorites.includes(Number(li.dataset.id));
    li.querySelector('.fav').setAttribute('aria-pressed', String(pressed));
  });
}

function toggleFavorite(id) {
  if (favorites.includes(id)) {
    favorites = favorites.filter((x) => x !== id);
  } else {
    favorites.push(id);
  }
  writeJson('favorites', favorites);
  renderFavorites();
}

let recent = readJson('recent', []);

function renderRecent() {
  const list = document.querySelector('#recent');
  list.innerHTML = '';
  recent.forEach((id) => {
    const item = document.createElement('li');
    item.textContent = titles[id];
    list.append(item);
  });
}

function rememberView(id) {
  recent = recent.filter((x) => x !== id);
  recent.unshift(id);
  recent = recent.slice(0, 3);
  writeJson('recent', recent);
  renderRecent();
}

document.querySelector('#products').addEventListener('click', (event) => {
  const li = event.target.closest('li');
  if (!li) return;
  const id = Number(li.dataset.id);
  if (event.target.closest('.fav')) toggleFavorite(id);
  if (event.target.closest('.view')) rememberView(id);
});

renderFavorites();
renderRecent();
