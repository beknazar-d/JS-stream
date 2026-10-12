const reviews = [
  { author: 'Анна', text: 'Чайник быстро закипает, доставили за день.' },
  { author: 'Игорь', text: 'Кнопка <Купить> не нажимается, а в поиске пишет &quot;ничего не найдено&quot;.' },
  { author: '<img src=x onerror="window.__pwned = true">', text: 'Спасибо!' },
];

function clean(value) {
  return value.replace(/<[^>]*>/g, '');
}

const list = document.querySelector('.reviews');

for (const review of reviews) {
  const item = document.createElement('li');
  item.className = 'review';

  const author = document.createElement('span');
  author.className = 'review__author';
  author.textContent = clean(review.author);

  const text = document.createElement('span');
  text.className = 'review__text';
  text.textContent = clean(review.text);

  item.append(author, text);
  list.append(item);
}
