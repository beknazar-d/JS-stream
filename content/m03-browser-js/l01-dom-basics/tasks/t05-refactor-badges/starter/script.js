var cards = document.getElementsByClassName('card');

for (var i = 0; i < cards.length; i++) {
  if (cards[i].getAttribute('data-new') == 'true') {
    cards[i].className = cards[i].className + ' card--new';
  }
}

var note = document.querySelector('.empty-note');
note.style.display = 'none';
