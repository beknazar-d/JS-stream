const norm = (s) => s.replace(/\s/g, ' ').trim();
const cards = () => $$('.catalog .card');

describe('Каталог после загрузки', () => {
  it('три карточки с названиями и ценами', () => {
    expect(cards(), 'Количество карточек').toHaveLength(3);
    expect(cards().map((c) => c.querySelector('.card__title').textContent), 'Названия').toEqual(['Чайник K-200', 'Блендер B-50', 'Тостер T-2']);
    expect(cards().map((c) => norm(c.querySelector('.card__price').textContent)), 'Цены').toEqual(['2 990 ₽', '4 990 ₽', '2 190 ₽']);
  });

  it('data-id у карточек', () => {
    expect(cards().map((c) => c.dataset.id), 'Идентификаторы').toEqual(['k200', 'b50', 't2']);
  });

  it('товар без остатка выключен', () => {
    const out = cards()[1];
    expect(out.classList.contains('card--out'), 'Класс card--out у блендера').toBe(true);
    expect(out.querySelector('.card__buy').disabled, 'Кнопка блендера отключена').toBe(true);
    expect(cards()[0].classList.contains('card--out'), 'У чайника нет card--out').toBe(false);
    expect(cards()[0].querySelector('.card__buy').disabled, 'Кнопка чайника включена').toBe(false);
  });

  it('сообщение «пусто» скрыто', () => {
    expect($('.empty').hidden, 'Сообщение скрыто при непустом каталоге').toBe(true);
  });
});
