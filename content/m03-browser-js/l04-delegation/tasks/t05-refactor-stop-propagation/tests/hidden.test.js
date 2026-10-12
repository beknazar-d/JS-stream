describe('События не скрываются от документа', () => {
  it('клик по сердечку доходит до обработчика на document', async () => {
    const spy = fn();
    document.addEventListener('click', spy);
    await click('#cards .card:nth-child(2) .heart');
    document.removeEventListener('click', spy);
    expect(spy, 'Обработчик на документе вызван').toHaveBeenCalledTimes(1);
  });

  it('клик по карточке тоже доходит до документа', async () => {
    const spy = fn();
    document.addEventListener('click', spy);
    await click('#cards .card:nth-child(2) .card__title');
    document.removeEventListener('click', spy);
    expect(spy, 'Обработчик на документе вызван').toHaveBeenCalledTimes(1);
  });
});

describe('Новые карточки', () => {
  const make = (title) => {
    const li = document.createElement('li');
    li.className = 'card';
    const span = document.createElement('span');
    span.className = 'card__title';
    span.textContent = title;
    const heart = document.createElement('button');
    heart.className = 'heart';
    heart.type = 'button';
    heart.setAttribute('aria-pressed', 'false');
    heart.textContent = '♡';
    li.append(span, ' ', heart);
    return li;
  };

  it('добавленная карточка выбирается', async () => {
    const li = make('Фен F-9');
    $('#cards').append(li);
    await click(li.querySelector('.card__title'));
    expect(li.classList.contains('is-selected'), 'Новая карточка выбрана').toBe(true);
    expect($('#selected').textContent.trim(), 'Текст выбранного').toBe('Выбрано: Фен F-9');
    li.remove();
  });

  it('сердечко добавленной карточки работает и не выбирает её', async () => {
    const li = make('Весы');
    $('#cards').append(li);
    const heart = li.querySelector('.heart');
    await click(heart);
    expect(heart.classList.contains('is-fav'), 'Избранное включено').toBe(true);
    expect(li.classList.contains('is-selected'), 'Карточка не выбрана').toBe(false);
    li.remove();
  });
});

describe('Список не выбирается целиком', () => {
  it('класс is-selected не попадает на список', async () => {
    await click('#cards .card:nth-child(1)');
    expect($('#cards').classList.contains('is-selected'), 'У #cards нет is-selected').toBe(false);
  });

  it('клик по пустому месту списка ничего не выбирает и не падает', async () => {
    await click('#cards .card:nth-child(1)');
    const before = $('#selected').textContent;
    await click('#cards');
    expect($('#selected').textContent, 'Текст не изменился').toBe(before);
    expect($$('#cards .is-selected'), 'Выбранная осталась одна').toHaveLength(1);
  });
});
