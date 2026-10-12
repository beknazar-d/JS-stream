const sortSelect = document.querySelector('#sort');

sortSelect.addEventListener('change', () => {
  localStorage.setItem('sort', sortSelect.value);
});
