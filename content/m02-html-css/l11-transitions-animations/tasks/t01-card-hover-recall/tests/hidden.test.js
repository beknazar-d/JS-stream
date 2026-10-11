// Тест не может навести мышь. Он берёт правила :hover и применяет их
// к элементу через временный класс, как будто курсор над ним.
// Плавный переход на время замера выключен: нужны конечные значения.
function hoverDeclarations(selector) {
  const names = new Set();
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule instanceof CSSStyleRule && rule.selectorText.includes(selector + ":hover")) {
        for (const name of rule.style) names.add(name);
      }
    }
  }
  return [...names];
}

function whileHovered(selector, callback) {
  const style = document.createElement("style");
  let text = "";
  for (const sheet of document.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule instanceof CSSStyleRule && rule.selectorText.includes(":hover")) {
        text += rule.cssText.replaceAll(":hover", ".test-hover") + "\n";
      }
    }
  }
  style.textContent = text + ".test-hover { transition: none !important; }";
  document.head.append(style);
  const element = $(selector);
  element.classList.add("test-hover");
  try {
    return callback();
  } finally {
    element.classList.remove("test-hover");
    style.remove();
  }
}

const seconds = (list) => list.split(",").map((item) => parseFloat(item));

describe('Переход не ломает страницу', () => {
  it('при наведении текст под карточкой не двигается', () => {
    const before = box('.note').top;
    const during = whileHovered('.card', () => box('.note').top);
    expect(during, 'Положение подписи под карточкой не должно меняться при наведении').toBe(before);
  });

  it('при наведении размеры карточки не меняются', () => {
    const before = [$('.card').offsetWidth, $('.card').offsetHeight];
    const during = whileHovered('.card', () => [$('.card').offsetWidth, $('.card').offsetHeight]);
    expect(during, 'Ширина и высота карточки до и при наведении').toEqual(before);
  });

  it('переход не слишком медленный: не дольше 0.4 секунды', () => {
    for (const value of seconds(css('.card', 'transition-duration'))) {
      expect(value, 'Интерфейс должен отвечать быстро').toBeLessThanOrEqual(0.4);
      expect(value, 'Переход должен быть заметен').toBeGreaterThan(0);
    }
  });
});
