const sortSelect = document.querySelector('#sort');

const saved = localStorage.getItem('sort');
if (saved) {
  sortSelect.value = saved;
}

sortSelect.addEventListener('change', () => {
  localStorage.setItem('sort', sortSelect.value);
});
