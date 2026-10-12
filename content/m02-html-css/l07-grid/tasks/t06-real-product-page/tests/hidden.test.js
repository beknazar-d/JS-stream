const near = (a, b, message, tol = 2) => expect(Math.abs(a - b), message + ` (получено ${a}, ожидалось около ${b})`).toBeLessThanOrEqual(tol);

describe('Устойчивость', () => {
  it('длинное название переносится, цена и кнопка остаются под ним', () => {
    $('.title').textContent = 'Электрический чайник K-200 с терморегулятором и подсветкой воды, серия «Премиум»';
    try {
      const t = box('.title');
      const g = box('.gallery');
      expect(t.height, 'Название заняло несколько строк').toBeGreaterThan(40);
      near(g.bottom, box('.buy').bottom, 'Фото по-прежнему доходит до кнопки');
      expect(box('.price').top, 'Цена ниже длинного названия').toBeGreaterThanOrEqual(t.bottom);
      near(t.right, box('main').right, 'Правая колонка не расползлась');
    } finally {
      $('.title').textContent = 'Электрический чайник K-200';
    }
  });

  it('длинное описание растягивает ряд, колонки не съезжают', () => {
    const p = $('.about p');
    const old = p.textContent;
    p.textContent = old + ' ' + 'Ещё одна подробность о модели. '.repeat(20);
    try {
      expect(box('.about').height, 'Описание выросло').toBeGreaterThan(100);
      near(box('.specs').top, box('.reviews').top, 'Характеристики и отзывы в одном ряду');
      expect(box('.specs').top, 'Характеристики ниже описания').toBeGreaterThanOrEqual(box('.about').bottom);
      near(box('.about').right, box('main').right, 'Описание всё ещё на всю ширину');
    } finally {
      p.textContent = old;
    }
  });

  it('это сетка', () => {
    expect(css('.product', 'display'), 'Страница товара — Grid').toBe('grid');
  });
});
