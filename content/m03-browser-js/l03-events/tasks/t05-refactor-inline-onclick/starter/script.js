const titles = {
  k200: 'Чайник K-200',
  b50: 'Блендер B-50',
  t2: 'Тостер T-2',
};

let total = 0;

function addToCart(id) {
  total += 1;
  document.querySelector('#summary').textContent = `В корзине: ${total} шт.`;
  document.querySelector('#last').textContent = `Последний товар: ${titles[id]}`;
}

let discount = 0;
let promoApplied = false;

function applyPromo() {
  if (promoApplied) return;
  promoApplied = true;
  discount += 10;
  document.querySelector('#promo-status').textContent = `Скидка: ${discount}%`;
}
