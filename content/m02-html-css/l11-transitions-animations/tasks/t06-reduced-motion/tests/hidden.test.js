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


describe('Содержимое остаётся видимым без анимации', () => {
  it('карточки полностью видны и на месте', () => {
    const state = withReducedMotion(() => $$('.product-card').map((card) => [css(card, 'opacity'), css(card, 'transform')]));
    expect(state, 'Без анимации карточка непрозрачна и без сдвига').toEqual([['1', 'none'], ['1', 'none'], ['1', 'none']]);
  });

  it('счётчик остаётся в обычном масштабе', () => {
    expect(withReducedMotion(() => css('.cart-count', 'transform')), 'Без анимации у счётчика нет масштаба').toBe('none');
  });
});

describe('Порядок правил', () => {
  it('блок reduce стоит после основных правил этих элементов', () => {
    const problems = [];
    for (const sheet of document.styleSheets) {
      const rules = [...sheet.cssRules];
      const blockIndex = rules.findIndex((rule) => rule instanceof CSSMediaRule && /prefers-reduced-motion\s*:\s*reduce/.test(rule.media.mediaText));
      if (blockIndex === -1) continue;
      const selectors = new Set([...rules[blockIndex].cssRules].flatMap((inner) => inner.selectorText?.split(',').map((item) => item.trim()) ?? []));
      rules.forEach((rule, index) => {
        if (index < blockIndex || !(rule instanceof CSSStyleRule)) return;
        const touches = rule.style.cssText.includes('animation') || rule.style.cssText.includes('transition');
        if (touches && selectors.has(rule.selectorText)) problems.push(rule.selectorText);
      });
    }
    expect(problems, 'Основные правила с animation или transition стоят ниже блока reduce и перебивают его. Блок пишут в конце файла').toEqual([]);
  });
});
