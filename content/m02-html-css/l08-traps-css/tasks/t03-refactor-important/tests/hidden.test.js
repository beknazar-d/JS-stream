const rules = () => {
  const sheet = $('style[data-file="styles.css"]').sheet;
  return [...sheet.cssRules].filter((r) => r.selectorText);
};

describe('Каскад без важностей и идентификаторов', () => {
  it('в стилях нет !important', () => {
    const source = $('style[data-file="styles.css"]').textContent;
    expect(source, 'В styles.css не должно быть !important').not.toMatch(/!important/);
  });

  it('в селекторах нет идентификаторов', () => {
    const withIds = rules().map((r) => r.selectorText).filter((s) => s.includes('#'));
    expect(withIds, 'Селекторы с # (идентификаторами)').toEqual([]);
  });

  it('в селекторах не больше двух классов', () => {
    const heavy = rules().map((r) => r.selectorText).filter((s) => (s.match(/\./g) || []).length > 2);
    expect(heavy, 'Слишком тяжёлые селекторы').toEqual([]);
  });

  it('новая карточка с теми же классами получает те же цвета', () => {
    const copy = $('.card:nth-child(2)').cloneNode(true);
    $('#catalog').appendChild(copy);
    try {
      expect(css(copy.querySelector('.price'), 'color'), 'Скидочная цена в новой карточке').toBe('rgb(192, 38, 27)');
      expect(css(copy.querySelector('.badge'), 'background-color'), 'Плашка-хит в новой карточке').toBe('rgb(27, 122, 58)');
    } finally {
      copy.remove();
    }
  });

  it('порядок правил не влияет: цена со скидкой красная даже без порядка', () => {
    const el = $('.card:nth-child(2) .price');
    expect(css(el, 'color'), 'Цена со скидкой').toBe('rgb(192, 38, 27)');
    el.classList.remove('sale');
    try {
      expect(css(el, 'color'), 'Без класса sale цена обычная').toBe('rgb(34, 34, 34)');
    } finally {
      el.classList.add('sale');
    }
  });
});
