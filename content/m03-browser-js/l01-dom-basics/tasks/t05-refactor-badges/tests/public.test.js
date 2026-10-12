const card = (n) => $(`.card:nth-child(${n})`);

describe('Рефакторинг скрипта каталога', () => {
  it('новинки отмечены, остальные нет', () => {
    expect(card(1).classList.contains('card--new'), 'Чайник: data-new="true"').toBe(true);
    expect(card(2).classList.contains('card--new'), 'Тостер: data-new="false"').toBe(false);
    expect(card(4).classList.contains('card--new'), 'Фен: нет атрибута data-new').toBe(false);
  });

  it('прежние классы сохранились', () => {
    expect(card(1).classList.contains('card--featured'), 'У чайника остался card--featured').toBe(true);
    expect(card(4).classList.contains('card--featured'), 'У фена остался card--featured').toBe(true);
    expect($$('.card'), 'Все четыре карточки имеют базовый класс card').toHaveLength(4);
  });

  it('сообщение скрыто через hidden, а не через style', () => {
    const note = $('.empty-note');
    expect(note.hidden, 'У сообщения есть атрибут hidden').toBe(true);
    expect(note.style.display, 'Inline-стиль display не задан').toBe('');
  });
});
