// Анимацию ставим на паузу и сами выбираем момент: так результат не зависит от скорости компьютера.
function sample(selector, timeMs, property) {
  const element = $(selector);
  const [animation] = element.getAnimations();
  animation.pause();
  animation.currentTime = timeMs;
  return css(element, property);
}

describe('Спиннер действительно вращается', () => {
  it('в начале оборота угол нулевой, в середине — полоборота', () => {
    const start = new DOMMatrix(sample('.spinner', 0, 'transform'));
    expect(start.isIdentity, 'В начале оборота поворота нет').toBe(true);
    const middle = new DOMMatrix(sample('.spinner', 500, 'transform'));
    expect(Math.round(middle.a), 'Через 0.5 с кольцо перевёрнуто: cos угла равен -1').toBe(-1);
  });

  it('размеры спиннера при вращении не меняются', () => {
    const spinner = $('.spinner');
    const before = [spinner.offsetWidth, spinner.offsetHeight, spinner.offsetTop];
    sample('.spinner', 250, 'transform');
    expect([spinner.offsetWidth, spinner.offsetHeight, spinner.offsetTop], 'Размеры и место в раскладке во время вращения').toEqual(before);
  });
});

describe('Скелетон действительно пульсирует', () => {
  it('прозрачность падает до 0.4 в середине и возвращается к 1', () => {
    expect(Number(sample('.skeleton', 0, 'opacity')), 'Прозрачность в начале').toBeCloseTo(1, 1);
    expect(Number(sample('.skeleton', 750, 'opacity')), 'Прозрачность в середине цикла').toBeCloseTo(0.4, 1);
    expect(Number(sample('.skeleton', 1500, 'opacity')), 'Прозрачность в конце цикла').toBeCloseTo(1, 1);
  });

  it('ширина скелетона во время пульса не меняется', () => {
    const element = $('.skeleton');
    const before = element.offsetWidth;
    sample('.skeleton', 750, 'opacity');
    expect(element.offsetWidth, 'Ширина скелетона в середине пульса').toBe(before);
  });
});
