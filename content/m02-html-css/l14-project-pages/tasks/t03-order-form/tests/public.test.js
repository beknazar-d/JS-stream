const near = (a, b, d = 2) => Math.abs(a - b) <= d;

describe('форма на 1024', () => {
  it('форма шириной 720 по центру', () => {
    const f = box('.order');
    expect(near(f.width, 720) && near(f.left, 152), `Форма: width=${f.width}, left=${f.left}, ждали 720 и 152`).toBe(true);
  });

  it('группы в рамке с отступом 16 и зазором 16', () => {
    const groups = $$('.order__group');
    expect(groups, 'Групп полей').toHaveLength(2);
    expect(css(groups[0], 'border-top-width'), 'Рамка группы').toBe('1px');
    expect(css(groups[0], 'padding-left'), 'Отступ внутри группы').toBe('16px');
    const a = box(groups[0]);
    const b = box(groups[1]);
    expect(near(b.top - a.bottom, 16), `Зазор между группами ${b.top - a.bottom}, ждали 16`).toBe(true);
  });

  it('имя и телефон в одной строке', () => {
    const n = box('#name');
    const p = box('#phone');
    expect(n.top === p.top && near(n.width, p.width), 'Имя и телефон: одна строка, одна ширина').toBe(true);
    expect(near(p.left - n.right, 16), `Зазор ${p.left - n.right}, ждали 16`).toBe(true);
  });

  it('почта и адрес на всю ширину строки', () => {
    const n = box('#name');
    const p = box('#phone');
    const full = n.width + 16 + p.width;
    expect(near(box('#email').width, full), `Почта ${box('#email').width}, ждали ${full}`).toBe(true);
    expect(near(box('#address').width, full), `Адрес ${box('#address').width}, ждали ${full}`).toBe(true);
  });

  it('город вдвое шире индекса', () => {
    const c = box('#city');
    const z = box('#zip');
    expect(c.top === z.top, 'Город и индекс в одной строке').toBe(true);
    expect(near(c.width, z.width * 2, 3), `Город ${c.width}, индекс ${z.width}`).toBe(true);
    expect(near(z.left - c.right, 16), `Зазор ${z.left - c.right}, ждали 16`).toBe(true);
  });

  it('высота полей', () => {
    for (const id of ['name', 'phone', 'email', 'address', 'city', 'zip']) {
      expect(near(box('#' + id).height, 44), `Поле ${id}: высота ${box('#' + id).height}, ждали 44`).toBe(true);
    }
    expect(near(box('#comment').height, 96), 'Комментарий высотой 96').toBe(true);
  });

  it('подвал: итог слева, кнопка справа', () => {
    const btn = box('.order__submit');
    const total = box('.order__total');
    const group = box($$('.order__group')[1]);
    expect(near(btn.width, 220) && near(btn.height, 48), `Кнопка ${btn.width} на ${btn.height}`).toBe(true);
    expect(near(btn.right, group.right), `Правый край кнопки ${btn.right}, группы ${group.right}`).toBe(true);
    expect(total.right < btn.left && near(total.top + total.height / 2, btn.top + btn.height / 2, 6), 'Итог слева и на одной линии с кнопкой').toBe(true);
  });
});
