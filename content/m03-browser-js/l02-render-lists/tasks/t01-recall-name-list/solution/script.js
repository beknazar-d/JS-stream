function renderNames(names) {
  const list = document.querySelector('#cart-list');
  const count = document.querySelector('#cart-count');

  list.replaceChildren();
  for (const name of names) {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.textContent = name;
    list.append(li);
  }
  count.textContent = 'Позиций: ' + names.length;
}

renderNames(['Чайник K-200', 'Блендер B-50', 'Тостер T-2']);
