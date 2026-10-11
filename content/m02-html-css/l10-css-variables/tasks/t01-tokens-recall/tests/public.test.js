describe('Объявление переменных', () => {
  it('в :root объявлена --color-brand со значением #0b6e4f', () => {
    const value = css(':root', '--color-brand').toLowerCase();
    expect(value, 'Значение --color-brand в :root').toBe('#0b6e4f');
  });

  it('в :root объявлена --space-md со значением 16px', () => {
    expect(css(':root', '--space-md'), 'Значение --space-md в :root').toBe('16px');
  });
});

describe('Использование переменных', () => {
  it('фон кнопки берётся из --color-brand', () => {
    expect(css('.button', 'background-color'), 'Фон кнопки при значении #0b6e4f').toBe('rgb(11, 110, 79)');
  });

  it('смена --color-brand на :root перекрашивает кнопку', () => {
    const root = document.documentElement;
    root.style.setProperty('--color-brand', '#ff0000');
    const changed = css('.button', 'background-color');
    root.style.removeProperty('--color-brand');
    expect(changed, 'Кнопка должна брать цвет через var(--color-brand), а не хранить его копию').toBe('rgb(255, 0, 0)');
  });

  it('боковые отступы кнопки равны --space-md', () => {
    expect(css('.button', 'padding-left'), 'Левый отступ кнопки').toBe('16px');
    expect(css('.button', 'padding-right'), 'Правый отступ кнопки').toBe('16px');
  });
});
