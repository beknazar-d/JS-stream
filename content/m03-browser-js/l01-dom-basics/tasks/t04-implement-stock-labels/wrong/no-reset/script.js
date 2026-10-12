function updateStock(card) {
  const label = card.querySelector('.stock');
  const button = card.querySelector('.buy');
  const raw = card.dataset.stock;
  const stock = Number(raw);

  if (raw !== undefined && stock === 0) {
    card.classList.add('card--out');
    button.disabled = true;
  }

  if (raw === undefined) {
    label.textContent = 'Уточняйте наличие';
  } else if (stock === 0) {
    label.textContent = 'Нет в наличии';
  } else if (stock <= 5) {
    label.textContent = `Осталось: ${stock} шт.`;
  } else {
    label.textContent = 'В наличии';
  }
}

for (const card of document.querySelectorAll('.card')) {
  updateStock(card);
}
