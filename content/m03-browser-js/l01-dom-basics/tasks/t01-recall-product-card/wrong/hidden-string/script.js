const badge = document.querySelector('.badge');
const link = document.querySelector('.buy-link');

document.querySelector('.product-title').textContent = 'Чайник K-200';
document.querySelector('.price').textContent = '3 490 ₽';

badge.hidden = 'false';
badge.classList.add('badge--sale');

link.setAttribute('href', '/cart/add?id=k200');
link.dataset.productId = 'k200';
