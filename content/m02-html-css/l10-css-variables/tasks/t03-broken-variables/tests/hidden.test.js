describe('Расстояние между карточками', () => {
  it('нижний внешний отступ карточки равен 16px', () => {
    expect(css('.card', 'margin-bottom'), 'Отступ под карточкой: var(--gap) со значением 16px').toBe('16px');
  });

  it('между первой и второй карточкой зазор 16px', () => {
    const first = box('.card:nth-of-type(1)');
    const second = box('.card:nth-of-type(2)');
    expect(Math.abs(second.top - first.bottom - 16), 'Зазор между карточками').toBeLessThanOrEqual(1);
  });
});

describe('Переменные работают как единый источник', () => {
  it('смена --gap на :root меняет и карточки, и подвал', () => {
    const root = document.documentElement;
    root.style.setProperty('--gap', '24px');
    const card = css('.card', 'margin-bottom');
    const footer = css('.site-footer', 'padding-top');
    root.style.removeProperty('--gap');
    expect(card, 'Отступ карточки при --gap: 24px').toBe('24px');
    expect(footer, 'Отступ подвала при --gap: 24px').toBe('24px');
  });

  it('смена --color-accent на :root меняет цену и ссылку', () => {
    const root = document.documentElement;
    root.style.setProperty('--color-accent', 'rgb(0, 0, 255)');
    const price = css('.card__price', 'color');
    const link = css('.site-footer__link', 'color');
    root.style.removeProperty('--color-accent');
    expect(price, 'Цвет цены при новом акценте').toBe('rgb(0, 0, 255)');
    expect(link, 'Цвет ссылки при новом акценте').toBe('rgb(0, 0, 255)');
  });
});
