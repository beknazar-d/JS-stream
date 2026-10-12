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

describe('Переход объявлен', () => {
  it('анимируются transform и box-shadow, а не все свойства', () => {
    const properties = css('.card', 'transition-property');
    expect(properties, 'Свойства перехода: должны быть перечислены transform и box-shadow').toContain('transform');
    expect(properties, 'Свойства перехода: должны быть перечислены transform и box-shadow').toContain('box-shadow');
    expect(properties, 'transition: all анимирует всё подряд, перечислите нужные свойства').not.toBe('all');
  });

  it('длительность 0.2 секунды', () => {
    const durations = seconds(css('.card', 'transition-duration'));
    for (const value of durations) {
      expect(value, 'Каждый переход идёт 0.2 секунды').toBeCloseTo(0.2, 2);
    }
  });
});

describe('Состояние при наведении', () => {
  it('есть правило .card:hover со сдвигом и тенью', () => {
    const names = hoverDeclarations('.card');
    expect(names, 'В .card:hover нужен transform').toContain('transform');
    expect(names, 'В .card:hover нужен box-shadow').toContain('box-shadow');
  });

  it('при наведении карточка поднимается на 4px', () => {
    const matrix = whileHovered('.card', () => new DOMMatrix(css('.card', 'transform')));
    expect(matrix.m42, 'Сдвиг по вертикали при наведении, пиксели (минус — вверх)').toBeCloseTo(-4, 0);
  });
});
