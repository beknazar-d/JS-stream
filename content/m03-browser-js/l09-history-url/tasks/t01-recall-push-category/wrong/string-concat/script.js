const select = document.querySelector('#category');

select.addEventListener('change', () => {
  history.pushState({ category: select.value }, '', '?category=' + select.value);
});
