const title = document.querySelector('main .product-title');
title.textContent = 'Блендер B-50';

const badge = document.querySelector('.sale-badge');
badge.classList.add('visible');

const notes = document.getElementsByClassName('stock-note');
notes.textContent = 'Осталось 3 шт.';
