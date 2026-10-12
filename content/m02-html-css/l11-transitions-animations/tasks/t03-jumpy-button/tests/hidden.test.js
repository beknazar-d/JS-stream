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

describe('Страница не дёргается', () => {
  it('при наведении подсказка под кнопкой остаётся на месте', () => {
    const before = box('.hint').top;
    const during = whileHovered('.add-button', () => box('.hint').top);
    expect(during, 'Положение подсказки при наведении на кнопку').toBe(before);
  });

  it('при наведении ширина и высота блока кнопки не меняются', () => {
    const button = $('.add-button');
    const before = [button.offsetWidth, button.offsetHeight];
    const during = whileHovered('.add-button', () => [button.offsetWidth, button.offsetHeight]);
    expect(during, 'Размеры кнопки в раскладке до и при наведении').toEqual(before);
  });

  it('при наведении кнопка всё ещё меняется (сдвиг или увеличение)', () => {
    const matrix = whileHovered('.add-button', () => new DOMMatrix(css('.add-button', 'transform')));
    expect(matrix.isIdentity, 'Эффект наведения должен остаться: используйте transform').toBe(false);
  });

  it('есть плавный переход, не короче 0.1 и не длиннее 0.4 секунды', () => {
    const durations = seconds(css('.add-button', 'transition-duration'));
    for (const value of durations) {
      expect(value, 'Длительность перехода').toBeGreaterThanOrEqual(0.1);
      expect(value, 'Длительность перехода').toBeLessThanOrEqual(0.4);
    }
  });
});
