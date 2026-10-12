const select = document.querySelector('#category');

select.addEventListener('change', () => {
  const params = new URLSearchParams({ category: select.value });
  history.replaceState({ category: select.value }, '', '?' + params);
});
