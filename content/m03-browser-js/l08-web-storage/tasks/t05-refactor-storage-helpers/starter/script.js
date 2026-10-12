const titles = {};
document.querySelectorAll('#products li').forEach((li) => {
  titles[li.dataset.id] = li.dataset.title;
});

// Избранное
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

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
  localStorage.setItem('favorites', JSON.stringify(favorites));
  renderFavorites();
}

// Недавно просмотренные
let recent = JSON.parse(localStorage.getItem('recent') || '[]');

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
  localStorage.setItem('recent', JSON.stringify(recent));
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
