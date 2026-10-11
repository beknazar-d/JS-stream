const near = (a, b, d = 2) => Math.abs(a - b) <= d;

describe('Ряд ячеек, обрезка и итог', () => {
  it('ячейки в один ряд и выровнены по верху', () => {
    for (const line of $$('.line')) {
      const [name, qty, sum] = ['.name', '.qty', '.sum'].map((s) => box(line.querySelector(s)));
      expect(near(name.top, qty.top) && near(qty.top, sum.top), `Верхние края ячеек: ${name.top}, ${qty.top}, ${sum.top}`).toBe(true);
      expect(name.left < qty.left && qty.left < sum.left, 'Порядок слева направо: название, количество, сумма').toBe(true);
    }
  });

  it('длинное название обрезано одной строкой', () => {
    const name = $('.line .name');
    expect(name.scrollWidth > name.clientWidth, 'Содержимое .name шире ячейки').toBe(true);
    expect(box(name).height < 40, `Высота .name: ${box(name).height}, ожидалось меньше 40`).toBe(true);
    expect(css(name, 'text-overflow'), 'text-overflow').toBe('ellipsis');
  });

  it('выравнивание текста', () => {
    expect(css('.qty', 'text-align'), 'text-align у .qty').toBe('center');
    expect(css('.sum', 'text-align'), 'text-align у .sum').toBe('right');
  });

  it('итог прижат вправо', () => {
    const total = box('.total');
    const page = box('.page');
    expect(near(total.width, 320), `Ширина .total: ${total.width}`).toBe(true);
    expect(near(total.right, page.right - 25), `Правый край .total: ${total.right}, ожидалось ${page.right - 25}`).toBe(true);
  });

  it('отступ итога от последней строки', () => {
    const last = $$('.line').at(-1);
    const gap = box('.total').top - box(last).bottom;
    expect(near(gap, 24), `Зазор между последней строкой и итогом: ${gap}, ожидалось 24`).toBe(true);
  });

  it('flex, grid и float не использованы', () => {
    const text = $('style[data-file="styles.css"]').textContent;
    expect(/flex|grid|float/.test(text), 'В styles.css есть flex, grid или float').toBe(false);
  });
});
