const order = () => $$('.item:nth-child(1) > *').map((el) => el.className);

describe('Порядок для клавиатуры и экранного диктора', () => {
  it('порядок в разметке совпадает с порядком на экране', () => {
    expect(order(), 'Дети строки в разметке: название, цена, кнопка').toEqual(['title', 'price', 'btn']);
  });

  it('первой в порядке Tab идёт ссылка с названием, затем кнопка', () => {
    const focusable = $$('.item:nth-child(1) a[href], .item:nth-child(1) button').map((el) => el.className);
    expect(focusable, 'Порядок фокуса в первой строке').toEqual(['title', 'btn']);
  });

  it('у элементов не осталось свойства order', () => {
    for (const sel of ['.title', '.price', '.btn']) {
      expect(css(sel, 'order'), `Вычисленный order у ${sel}`).toBe('0');
    }
    const source = $('style[data-file="styles.css"]').textContent;
    expect(source, 'В styles.css не должно быть свойства order').not.toMatch(/(^|[\s{;])order\s*:/);
  });

  it('и вторая строка устроена так же', () => {
    expect($$('.item:nth-child(2) > *').map((el) => el.className), 'Дети второй строки').toEqual(['title', 'price', 'btn']);
    expect(box('.item:nth-child(2) .title').left, 'Название второй строки левее кнопки').toBeLessThan(box('.item:nth-child(2) .btn').left);
  });
});
