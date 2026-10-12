const sortSelect = document.querySelector('#sort');

const saved = localStorage.getItem('sort');
if (saved) {
  sortSelect.value = saved;
}

sortSelect.addEventListener('change', () => {
  // popular и так выбран по умолчанию, его можно не хранить
  if (sortSelect.value !== 'popular') {
    localStorage.setItem('sort', sortSelect.value);
  }
});
