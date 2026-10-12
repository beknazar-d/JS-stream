const sortSelect = document.querySelector('#sort');

const saved = sessionStorage.getItem('sort');
if (saved) {
  sortSelect.value = saved;
}

sortSelect.addEventListener('change', () => {
  sessionStorage.setItem('sort', sortSelect.value);
});
