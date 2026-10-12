for (const card of document.querySelectorAll('.card')) {
  if (card.dataset.new === 'true') {
    card.className = 'card--new';
  }
}

document.querySelector('.empty-note').hidden = true;
