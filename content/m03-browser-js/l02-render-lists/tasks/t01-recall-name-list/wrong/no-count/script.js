function renderNames(names) {
  const list = document.querySelector('#cart-list');

  list.replaceChildren();
  for (const name of names) {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.textContent = name;
    list.append(li);
  }
}

renderNames(['Чайник K-200', 'Блендер B-50', 'Тостер T-2']);
