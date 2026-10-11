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

const LAYOUT = ['width', 'height', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left', 'top', 'left', 'right', 'bottom', 'font-size', 'border-top-width'];

describe('Что анимируется', () => {
  it('переход не использует all', () => {
    expect(css('.add-button', 'transition-property'), 'transition: all тянет за собой любое изменённое свойство').not.toBe('all');
  });

  it('плавно изменяются transform и цвет, а не размеры и отступы', () => {
    const properties = css('.add-button', 'transition-property').split(',').map((item) => item.trim());
    expect(properties, 'Переход должен включать transform').toContain('transform');
    const bad = properties.filter((name) => LAYOUT.includes(name));
    expect(bad, 'Эти свойства меняют раскладку страницы, их нельзя анимировать').toEqual([]);
  });

  it('правило :hover не меняет размеры и отступы', () => {
    const names = hoverDeclarations('.add-button');
    const bad = names.filter((name) => LAYOUT.includes(name));
    expect(bad, 'В .add-button:hover остались свойства, меняющие раскладку. Замените их на transform').toEqual([]);
  });
});
