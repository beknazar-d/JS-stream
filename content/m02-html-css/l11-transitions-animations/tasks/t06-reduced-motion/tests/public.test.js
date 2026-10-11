const TECHNICAL = ["offset", "easing", "composite", "computedOffset"];

// Тест не может включить в браузере режим «уменьшить движение».
// Поэтому он берёт правила из блока @media (prefers-reduced-motion: reduce)
// и применяет их так, как будто условие выполнено.
function reducedRules() {
  const rules = [];
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule instanceof CSSMediaRule && /prefers-reduced-motion\s*:\s*reduce/.test(rule.media.mediaText)) {
        for (const inner of rule.cssRules) rules.push(inner.cssText);
      }
    }
  }
  return rules.join("\n");
}

function withReducedMotion(callback) {
  const style = document.createElement("style");
  style.textContent = reducedRules();
  document.head.append(style);
  try {
    return callback();
  } finally {
    style.remove();
  }
}

const seconds = (list) => list.split(",").map((item) => parseFloat(item));
const animationOff = (selector) => css(selector, "animation-name") === "none" || seconds(css(selector, "animation-duration")).every((value) => value <= 0.001);
const transitionOff = (selector) => css(selector, "transition-property") === "none" || seconds(css(selector, "transition-duration")).every((value) => value <= 0.001);


describe('Счётчик корзины подпрыгивает', () => {
  it('у .cart-count есть анимация до 1 секунды, не бесконечная', () => {
    const animations = $('.cart-count').getAnimations();
    expect(animations, 'У счётчика должна быть одна анимация (animation и @keyframes bump)').toHaveLength(1);
    const timing = animations[0].effect.getTiming();
    expect(timing.duration, 'Длительность подпрыга, мс').toBe(500);
    expect(timing.iterations, 'Число повторов: два. Бесконечная анимация отвлекает').toBe(2);
  });

  it('масштаб растёт до 1.3 в середине и возвращается к 1', () => {
    const element = $('.cart-count');
    const [animation] = element.getAnimations();
    animation.pause();
    const scaleAt = (time) => { animation.currentTime = time; return new DOMMatrix(css(element, 'transform')).a; };
    const values = [scaleAt(0), scaleAt(250), scaleAt(499)];
    // Возвращаем анимацию в обычное состояние, чтобы остановка не влияла на другие проверки.
    animation.cancel();
    element.style.animation = 'none';
    void element.offsetWidth;
    element.style.animation = '';
    expect(values[0], 'Масштаб в начале').toBeCloseTo(1, 1);
    expect(values[1], 'Масштаб в середине подпрыга').toBeCloseTo(1.3, 1);
    expect(values[2], 'Масштаб в конце первого повтора').toBeCloseTo(1, 1);
  });

  it('анимируется только transform', () => {
    const [animation] = $('.cart-count').getAnimations();
    const names = animation.effect.getKeyframes().flatMap((frame) => Object.keys(frame)).filter((name) => !TECHNICAL.includes(name));
    expect([...new Set(names)], 'Свойства в @keyframes bump').toEqual(['transform']);
  });
});

describe('Движение включено по умолчанию', () => {
  it('карточки появляются с анимацией, у кнопки есть переход', () => {
    expect($$('.product-card').map((card) => card.getAnimations().length), 'Анимация появления у каждой из трёх карточек').toEqual([1, 1, 1]);
    expect(seconds(css('.button', 'transition-duration'))[0], 'Переход кнопки есть').toBeGreaterThan(0);
  });
});

describe('Режим «уменьшить движение»', () => {
  it('есть блок @media (prefers-reduced-motion: reduce) с правилами', () => {
    expect(reducedRules().length, 'Нужен @media (prefers-reduced-motion: reduce) с правилами внутри').toBeGreaterThan(0);
  });

  it('в этом режиме анимации карточек и счётчика выключены', () => {
    const state = withReducedMotion(() => [animationOff('.product-card'), animationOff('.cart-count')]);
    expect(state, 'animation у .product-card и .cart-count должен быть none или нулевой длительности').toEqual([true, true]);
  });

  it('в этом режиме выключен переход кнопки', () => {
    expect(withReducedMotion(() => transitionOff('.button')), 'transition у .button должен быть none или нулевой длительности').toBe(true);
  });
});
