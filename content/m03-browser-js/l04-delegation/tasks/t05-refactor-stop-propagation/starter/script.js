const selected = document.querySelector('#selected');

for (const card of document.querySelectorAll('.card')) {
  card.addEventListener('click', () => {
    for (const other of document.querySelectorAll('.card')) {
      other.classList.remove('is-selected');
    }
    card.classList.add('is-selected');
    selected.textContent = 'Выбрано: ' + card.querySelector('.card__title').textContent;
  });

  const heart = card.querySelector('.heart');
  heart.addEventListener('click', (event) => {
    event.stopPropagation();
    const isFav = heart.classList.toggle('is-fav');
    heart.setAttribute('aria-pressed', String(isFav));
    heart.textContent = isFav ? '♥' : '♡';
  });
}
