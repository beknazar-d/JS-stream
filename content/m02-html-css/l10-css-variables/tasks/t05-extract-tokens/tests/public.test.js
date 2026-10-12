const root = document.documentElement;

describe('Внешний вид не изменился', () => {
  it('шапка: фон бренда, белый текст, отступ 16px', () => {
    expect(css('.site-header', 'background-color'), 'Фон шапки').toBe('rgb(11, 110, 79)');
    expect(css('.site-header', 'color'), 'Цвет текста шапки').toBe('rgb(255, 255, 255)');
    expect(css('.site-header', 'padding-left'), 'Отступ шапки').toBe('16px');
  });

  it('карточка товара: белый фон, серая рамка, текст страницы', () => {
    expect(css('.product', 'background-color'), 'Фон карточки').toBe('rgb(255, 255, 255)');
    expect(css('.product', 'border-top-color'), 'Цвет рамки карточки').toBe('rgb(213, 219, 225)');
    expect(css('.product', 'color'), 'Цвет текста карточки').toBe('rgb(29, 39, 51)');
    expect(css('.product', 'padding-left'), 'Внутренний отступ карточки').toBe('16px');
  });

  it('кнопка и подвал: цвета и отступы прежние', () => {
    expect(css('.button', 'background-color'), 'Фон кнопки').toBe('rgb(11, 110, 79)');
    expect(css('.button', 'color'), 'Цвет текста кнопки').toBe('rgb(255, 255, 255)');
    expect(css('.button', 'padding-left'), 'Боковой отступ кнопки').toBe('16px');
    expect(css('.button', 'padding-top'), 'Вертикальный отступ кнопки').toBe('8px');
    expect(css('.site-footer', 'border-top-color'), 'Цвет линии над подвалом').toBe('rgb(213, 219, 225)');
  });
});

describe('Цвета вынесены в переменные', () => {
  it('во всех правилах, кроме :root, нет цветов-литералов', () => {
    const literal = /#[0-9a-f]{3,8}\b|\brgba?\(|\bhsla?\(/i;
    const offenders = [];
    for (const sheet of document.styleSheets) {
      for (const rule of sheet.cssRules) {
        if (rule instanceof CSSStyleRule && rule.selectorText !== ':root' && literal.test(rule.style.cssText)) {
          offenders.push(rule.selectorText);
        }
      }
    }
    expect(offenders, 'Правила, где цвет всё ещё написан значением. Замените на var(--color-...)').toEqual([]);
  });

  it('в :root есть пять переменных цветов и --space-md', () => {
    for (const name of ['--color-brand', '--color-on-brand', '--color-text', '--color-surface', '--color-border', '--space-md']) {
      expect(css(':root', name), `Переменная ${name} должна быть объявлена в :root`).not.toBe('');
    }
  });
});
