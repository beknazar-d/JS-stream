describe('Раскладка не двигается во время анимации', () => {
  it('плашка не меняет положение в потоке', () => {
    const badge = $('.badge');
    const [animation] = badge.getAnimations();
    animation.pause();
    animation.currentTime = 0;
    const atStart = [badge.offsetLeft, badge.offsetTop];
    animation.currentTime = 600;
    const atEnd = [badge.offsetLeft, badge.offsetTop];
    expect(atStart, 'Положение плашки в начале и в конце анимации в раскладке одинаково (offsetLeft, offsetTop)').toEqual(atEnd);
  });

  it('позиционирование для анимации не нужно', () => {
    expect(css('.badge', 'position'), 'Свойство position: relative было нужно только для left, теперь его можно убрать').toBe('static');
  });

  it('цена под плашкой не двигается', () => {
    const [animation] = $('.badge').getAnimations();
    animation.pause();
    animation.currentTime = 0;
    const atStart = box('.price').top;
    animation.currentTime = 300;
    expect(box('.price').top, 'Положение цены во время анимации плашки').toBe(atStart);
  });

  it('плавность и заполнение сохранились', () => {
    const [animation] = $('.badge').getAnimations();
    expect(animation.effect.getTiming().fill, 'animation-fill-mode: both').toBe('both');
    expect(animation.effect.getKeyframes()[0].easing, 'Функция плавности ease-out').toBe('ease-out');
  });
});
