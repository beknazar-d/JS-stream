const sheetRules = () => {
  const style = $('style[data-file="styles.css"]');
  return [...style.sheet.cssRules];
};
const layerBlocks = () => sheetRules().filter((r) => r.constructor.name === 'CSSLayerBlockRule');

describe('слои', () => {
  it('утилита скрывает кнопку, хотя селектор компонента точнее', () => {
    expect(css('.u-hidden', 'display'), 'display кнопки с классом u-hidden').toBe('none');
  });

  it('утилита задаёт отступ заголовку', () => {
    expect(css('.card__title', 'margin-top'), 'Верхний отступ заголовка с u-mt-16').toBe('16px');
  });

  it('компонент побеждает сброс', () => {
    expect(css('.btn:not(.u-hidden)', 'padding-left'), 'Отступы кнопки «В корзину»').toBe('16px');
    expect(css('.btn:not(.u-hidden)', 'padding-top'), 'Вертикальные отступы кнопки').toBe('8px');
  });

  it('правила разложены по слоям', () => {
    expect(layerBlocks().length >= 3, `Блоков @layer в файле: ${layerBlocks().length}, нужно не меньше трёх`).toBe(true);
  });
});
