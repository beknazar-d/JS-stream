const cards = document.querySelector('#cards');
const selected = document.querySelector('#selected');

function toggleFavorite(heart) {
  const isFav = heart.classList.toggle('is-fav');
  heart.setAttribute('aria-pressed', String(isFav));
  heart.textContent = isFav ? '♥' : '♡';
}

function selectCard(card) {
  for (const other of cards.querySelectorAll('.card')) {
    other.classList.remove('is-selected');
  }
  card.classList.add('is-selected');
  selected.textContent = 'Выбрано: ' + card.querySelector('.card__title').textContent;
}

cards.addEventListener('click', (event) => {
  const heart = event.target.closest('.heart');
  if (heart) {
    toggleFavorite(heart);
  }

  const card = event.target.closest('.card');
  if (card) selectCard(card);
});
