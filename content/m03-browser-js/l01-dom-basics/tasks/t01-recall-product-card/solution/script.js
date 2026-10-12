const title = document.querySelector('.product-title');
const price = document.querySelector('.price');
const badge = document.querySelector('.badge');
const link = document.querySelector('.buy-link');

title.textContent = 'Чайник K-200';
price.textContent = '3 490 ₽';

badge.hidden = false;
badge.classList.add('badge--sale');

link.setAttribute('href', '/cart/add?id=k200');
link.dataset.productId = 'k200';
