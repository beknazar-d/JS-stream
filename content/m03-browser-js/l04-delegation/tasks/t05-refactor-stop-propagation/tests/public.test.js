const card = (n) => $(`#cards .card:nth-child(${n})`);

describe('Выбор карточки', () => {
  it('клик по карточке выбирает её', async () => {
    await click('#cards .card:nth-child(1) .card__title');
    expect(card(1).classList.contains('is-selected'), 'Первая карточка выбрана').toBe(true);
    expect($('#selected').textContent.trim(), 'Текст выбранного').toBe('Выбрано: Чайник K-200');
  });

  it('выбранной остаётся одна карточка', async () => {
    await click('#cards .card:nth-child(2)');
    expect(card(1).classList.contains('is-selected'), 'Первая больше не выбрана').toBe(false);
    expect(card(2).classList.contains('is-selected'), 'Вторая выбрана').toBe(true);
    expect($$('#cards .is-selected'), 'Выбранных карточек').toHaveLength(1);
    expect($('#selected').textContent.trim(), 'Текст выбранного').toBe('Выбрано: Блендер B-50');
  });
});

describe('Избранное', () => {
  it('клик по сердечку переключает избранное', async () => {
    const heart = card(3).querySelector('.heart');
    await click(heart);
    expect(heart.classList.contains('is-fav'), 'Класс is-fav включён').toBe(true);
    expect(heart.getAttribute('aria-pressed'), 'aria-pressed').toBe('true');
    expect(heart.textContent.trim(), 'Текст сердечка').toBe('♥');
    await click(heart);
    expect(heart.classList.contains('is-fav'), 'Класс is-fav выключен').toBe(false);
    expect(heart.getAttribute('aria-pressed'), 'aria-pressed после повторного клика').toBe('false');
    expect(heart.textContent.trim(), 'Текст сердечка после повторного клика').toBe('♡');
  });

  it('клик по сердечку не выбирает карточку', async () => {
    await click('#cards .card:nth-child(1) .card__title');
    await click(card(3).querySelector('.heart'));
    expect(card(3).classList.contains('is-selected'), 'Третья карточка не выбрана').toBe(false);
    expect(card(1).classList.contains('is-selected'), 'Выбранная первая осталась выбранной').toBe(true);
    expect($('#selected').textContent.trim(), 'Текст выбранного не изменился').toBe('Выбрано: Чайник K-200');
  });
});
