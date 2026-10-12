const parse = (color) => color.match(/[\d.]+/g).slice(0, 3).map(Number);
const channel = (v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const luminance = (color) => { const [r, g, b] = parse(color).map(channel); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
const root = document.documentElement;
afterEach(() => root.removeAttribute("data-theme"));

describe('Светлая тема по умолчанию', () => {
  it('без выбора темы страница светлая и читаемая', () => {
    expect(luminance(css('body', 'background-color')), 'Фон страницы по умолчанию светлый').toBeGreaterThan(0.8);
    expect(contrast(css('.card', 'color'), css('.card', 'background-color')), 'Контраст текста карточки в светлой теме, минимум 4.5').toBeGreaterThanOrEqual(4.5);
  });
});

describe('Тёмная тема через data-theme="dark"', () => {
  it('фон страницы тёмный, текст светлый', () => {
    root.setAttribute('data-theme', 'dark');
    expect(luminance(css('body', 'background-color')), 'Фон страницы в тёмной теме').toBeLessThan(0.1);
    expect(luminance(css('body', 'color')), 'Цвет текста в тёмной теме').toBeGreaterThan(0.6);
  });

  it('карточка тоже тёмная, и текст на ней читается', () => {
    root.setAttribute('data-theme', 'dark');
    expect(luminance(css('.card', 'background-color')), 'Фон карточки в тёмной теме').toBeLessThan(0.15);
    expect(contrast(css('.card', 'color'), css('.card', 'background-color')), 'Контраст текста на карточке, минимум 4.5').toBeGreaterThanOrEqual(4.5);
  });

  it('текст кнопки читается на её фоне', () => {
    root.setAttribute('data-theme', 'dark');
    expect(contrast(css('.button', 'color'), css('.button', 'background-color')), 'Контраст текста кнопки в тёмной теме, минимум 4.5').toBeGreaterThanOrEqual(4.5);
  });
});
