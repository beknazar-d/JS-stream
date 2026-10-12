describe('Граничные случаи', () => {
  it('класс не дублируется у карточки, где он уже был', () => {
    const names = $('.card:nth-child(3)').className.split(/\s+/).filter(Boolean);
    expect(names.filter((name) => name === 'card--new'), 'Сколько раз card--new в className у блендера').toHaveLength(1);
  });

  it('значение data-new="false" не делает новинкой', () => {
    const toaster = $('.card:nth-child(2)');
    expect(toaster.dataset.new, 'Исходный атрибут остался на месте').toBe('false');
    expect(toaster.classList.contains('card--new'), 'Тостер не новинка').toBe(false);
  });

  it('все остальные классы сохранены целиком', () => {
    expect([...$('.card:nth-child(1)').classList].sort(), 'Классы чайника').toEqual(['card', 'card--featured', 'card--new']);
    expect([...$('.card:nth-child(2)').classList].sort(), 'Классы тостера').toEqual(['card']);
  });

  it('сообщение скрыто и на экране', () => {
    expect(css('.empty-note', 'display'), 'Вычисленный display сообщения').toBe('none');
  });
});
