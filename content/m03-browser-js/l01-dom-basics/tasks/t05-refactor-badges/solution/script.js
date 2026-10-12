for (const card of document.querySelectorAll('.card')) {
  if (card.dataset.new === 'true') {
    card.classList.add('card--new');
  }
}

document.querySelector('.empty-note').hidden = true;
