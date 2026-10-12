const titles = {
  k200: 'Чайник K-200',
  b50: 'Блендер B-50',
  t2: 'Тостер T-2',
};

let total = 0;

function onBuyClick(event) {
  const id = event.target.dataset.id;
  total += 1;
  document.querySelector('#summary').textContent = `В корзине: ${total} шт.`;
  document.querySelector('#last').textContent = `Последний товар: ${titles[id]}`;
}

for (const button of document.querySelectorAll('.buy')) {
  button.addEventListener('click', onBuyClick);
}

let discount = 0;

function applyPromo() {
  discount += 10;
  document.querySelector('#promo-status').textContent = `Скидка: ${discount}%`;
}

document.querySelector('#promo-btn').addEventListener('click', applyPromo, { once: true });
