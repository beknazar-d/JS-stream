const only = (keyframes) => new Set(keyframes.flatMap((frame) => Object.keys(frame)).filter((name) => !['offset', 'easing', 'composite', 'computedOffset'].includes(name)));

describe('Спиннер', () => {
  it('на .spinner запущена анимация', () => {
    expect($('.spinner').getAnimations(), 'У .spinner должна быть анимация (animation-name и @keyframes с таким именем)').toHaveLength(1);
  });

  it('вращается равномерно и бесконечно, за секунду', () => {
    const [animation] = $('.spinner').getAnimations();
    const timing = animation.effect.getTiming();
    expect(timing.duration, 'Длительность оборота, мс').toBe(1000);
    expect(timing.iterations, 'Число повторов: бесконечно').toBe(Infinity);
    // animation-timing-function применяется к каждому кадру, а не ко всей анимации.
    expect(animation.effect.getKeyframes()[0].easing, 'Функция плавности: linear. Со стандартной ease вращение дёргается').toBe('linear');
  });

  it('меняется только transform', () => {
    const [animation] = $('.spinner').getAnimations();
    expect([...only(animation.effect.getKeyframes())], 'Свойства, которые анимируются у спиннера').toEqual(['transform']);
  });
});

describe('Скелетоны', () => {
  it('у каждого из трёх скелетонов есть анимация', () => {
    const counts = $$('.skeleton').map((element) => element.getAnimations().length);
    expect(counts, 'Число анимаций у каждого .skeleton').toEqual([1, 1, 1]);
  });

  it('пульсируют по кругу за 1.5 секунды', () => {
    const [animation] = $('.skeleton').getAnimations();
    const timing = animation.effect.getTiming();
    expect(timing.duration, 'Длительность пульса, мс').toBe(1500);
    expect(timing.iterations, 'Число повторов: бесконечно').toBe(Infinity);
    expect(animation.effect.getKeyframes()[0].easing, 'Функция плавности: ease-in-out').toBe('ease-in-out');
  });

  it('меняется только opacity', () => {
    const [animation] = $('.skeleton').getAnimations();
    expect([...only(animation.effect.getKeyframes())], 'Свойства, которые анимируются у скелетона').toEqual(['opacity']);
  });
});
