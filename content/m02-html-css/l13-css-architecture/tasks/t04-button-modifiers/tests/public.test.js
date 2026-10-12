const btn = (text) => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === text);

describe('кнопки каталога', () => {
  it('«Купить сейчас» оранжевая с белым текстом', () => {
    expect(css(btn('Купить сейчас'), 'background-color'), 'Фон «Купить сейчас»').toBe('rgb(194, 65, 12)');
    expect(css(btn('Купить сейчас'), 'color'), 'Цвет текста «Купить сейчас»').toBe('rgb(255, 255, 255)');
  });

  it('«В избранное» прозрачная с синей рамкой', () => {
    expect(css(btn('В избранное'), 'background-color'), 'Фон «В избранное»').toBe('rgba(0, 0, 0, 0)');
    expect(css(btn('В избранное'), 'border-top-color'), 'Рамка «В избранное»').toBe('rgb(11, 61, 145)');
    expect(css(btn('В избранное'), 'color'), 'Текст «В избранное»').toBe('rgb(11, 61, 145)');
  });

  it('«Сравнить» маленькая и широкая', () => {
    const b = btn('Сравнить');
    expect(css(b, 'font-size'), 'Размер шрифта «Сравнить»').toBe('14px');
    expect(css(b, 'padding-top'), 'Вертикальный отступ «Сравнить»').toBe('6px');
    expect(css(b, 'padding-left'), 'Горизонтальный отступ «Сравнить»').toBe('48px');
  });
});
