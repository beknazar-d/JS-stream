const cards = () => $$('.card');
const NO_BG = 'rgba(0, 0, 0, 0)';

describe('Чётные карточки, ссылки и отступы', () => {
  it('фон только у чётных карточек', () => {
    const bgs = cards().map((card) => css(card, 'background-color'));
    expect(bgs, 'Фон карточек 1, 2, 3, 4').toEqual([NO_BG, 'rgb(243, 245, 247)', NO_BG, 'rgb(243, 245, 247)']);
  });

  it('синие только внешние ссылки', () => {
    for (const link of $$('.link-out')) {
      expect(css(link, 'color'), `Цвет внешней ссылки ${link.getAttribute('href')}`).toBe('rgb(0, 102, 204)');
    }
    for (const link of $$('.link-in')) {
      expect(css(link, 'color'), `Цвет внутренней ссылки ${link.getAttribute('href')} не должен быть #0066cc`).not.toBe('rgb(0, 102, 204)');
    }
  });

  it('отступ только у ссылки сразу после цены', () => {
    for (const link of $$('.link-out')) expect(css(link, 'margin-top'), 'margin-top у внешней ссылки').toBe('8px');
    for (const link of $$('.link-in')) expect(css(link, 'margin-top'), 'margin-top у внутренней ссылки').toBe('0px');
  });

  it('без !important и id в селекторах', () => {
    const text = $('style[data-file="styles.css"]').textContent;
    expect(text.includes('!important'), 'В styles.css есть !important').toBe(false);
    const selectors = [...document.styleSheets].flatMap((s) => [...s.cssRules]).map((r) => r.selectorText || '');
    expect(selectors.some((s) => s.includes('#')), 'Среди селекторов есть селектор по id').toBe(false);
  });
});
