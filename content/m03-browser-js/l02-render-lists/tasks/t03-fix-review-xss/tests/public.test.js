const original = [
  ['Анна', 'Чайник быстро закипает, доставили за день.'],
  ['Игорь', 'Кнопка <Купить> не нажимается, а в поиске пишет &quot;ничего не найдено&quot;.'],
  ['<img src=x onerror="window.__pwned = true">', 'Спасибо!'],
];

describe('Отзывы', () => {
  it('три отзыва в том же порядке', () => {
    const items = $$('.reviews .review');
    expect(items, 'Количество отзывов').toHaveLength(3);
    expect(items.map((li) => li.querySelector('.review__author')?.textContent), 'Авторы').toEqual(original.map((r) => r[0]));
  });

  it('текст отзыва показан символ в символ', () => {
    const texts = $$('.reviews .review').map((li) => li.querySelector('.review__text')?.textContent);
    expect(texts, 'Тексты отзывов').toEqual(original.map((r) => r[1]));
  });

  it('во вложенных элементах нет разметки покупателей', () => {
    expect($$('.reviews img'), 'Элементов img нет').toHaveLength(0);
    expect($$('.reviews b, .reviews купить'), 'Чужих тегов нет').toHaveLength(0);
  });
});
