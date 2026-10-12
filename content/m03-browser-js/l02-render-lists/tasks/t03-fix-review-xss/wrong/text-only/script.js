const reviews = [
  { author: 'Анна', text: 'Чайник быстро закипает, доставили за день.' },
  { author: 'Игорь', text: 'Кнопка <Купить> не нажимается, а в поиске пишет &quot;ничего не найдено&quot;.' },
  { author: '<img src=x onerror="window.__pwned = true">', text: 'Спасибо!' },
];

const list = document.querySelector('.reviews');

for (const review of reviews) {
  const item = document.createElement('li');
  item.className = 'review';
  item.innerHTML = '<span class="review__author">' + review.author + '</span><span class="review__text"></span>';
  item.querySelector('.review__text').textContent = review.text;
  list.append(item);
}
