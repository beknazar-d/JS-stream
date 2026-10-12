const TECHNICAL = ['offset', 'easing', 'composite', 'computedOffset'];
const animated = (animation) => [...new Set(animation.effect.getKeyframes().flatMap((frame) => Object.keys(frame)).filter((name) => !TECHNICAL.includes(name)))].sort();

function sample(timeMs) {
  const [animation] = $('.badge').getAnimations();
  animation.pause();
  animation.currentTime = timeMs;
  return { transform: new DOMMatrix(css('.badge', 'transform')), opacity: Number(css('.badge', 'opacity')) };
}

describe('Анимация сохранилась', () => {
  it('у .badge запущена анимация на 0.6 секунды', () => {
    const animations = $('.badge').getAnimations();
    expect(animations, 'У плашки должна быть одна анимация. Проверьте, что имя в animation совпадает с именем в @keyframes').toHaveLength(1);
    expect(animations[0].effect.getTiming().duration, 'Длительность анимации, мс').toBe(600);
  });

  it('плашка начинает слева за пределами и невидимой', () => {
    const start = sample(0);
    expect(start.transform.m41, 'В начале плашка сдвинута на 120px влево').toBeCloseTo(-120, 0);
    expect(start.opacity, 'В начале плашка прозрачна').toBe(0);
  });

  it('плашка заканчивает на месте и видимой', () => {
    const end = sample(600);
    expect(end.transform.m41, 'В конце сдвига нет').toBeCloseTo(0, 0);
    expect(end.opacity, 'В конце плашка непрозрачна').toBe(1);
  });
});

describe('Только дешёвые свойства', () => {
  it('анимируются только opacity и transform', () => {
    const [animation] = $('.badge').getAnimations();
    expect(animated(animation), 'Свойства в @keyframes. Свойство left нужно заменить на transform').toEqual(['opacity', 'transform']);
  });
});
