const reviews = [
  { author: 'Анна', text: 'Чайник быстро закипает, доставили за день.' },
  { author: 'Игорь', text: 'Кнопка <Купить> не нажимается, а в поиске пишет &quot;ничего не найдено&quot;.' },
  { author: '<img src=x onerror="window.__pwned = true">', text: 'Спасибо!' },
];

function safe(value) {
  return value.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

const list = document.querySelector('.reviews');

for (const review of reviews) {
  list.innerHTML +=
    '<li class="review">' +
    '<span class="review__author">' + safe(review.author) + '</span>' +
    '<span class="review__text">' + safe(review.text) + '</span>' +
    '</li>';
}
