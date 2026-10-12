const select = document.querySelector('#category');

select.addEventListener('change', () => {
  const params = new URLSearchParams({ category: select.value });
  history.pushState({ category: select.value }, '', '?' + params);
});
