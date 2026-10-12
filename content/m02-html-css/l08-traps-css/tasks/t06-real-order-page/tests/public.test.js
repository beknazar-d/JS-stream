describe('Страница заказа без ловушек', () => {
  it('боковое меню доходит до нижнего края окна', () => {
    const b = box('.sidebar');
    expect(b.top, 'Меню начинается сверху').toBeLessThanOrEqual(1);
    expect(b.bottom, 'Нижний край меню у нижнего края окна 768px (сейчас ' + b.bottom + ')').toBeGreaterThanOrEqual(766);
  });

  it('заголовок заказа имеет отступ внутри жёлтого блока', () => {
    const s = box('.summary');
    const h = box('.summary h1');
    expect(h.top - s.top, 'Расстояние от верха жёлтого блока до заголовка (сейчас ' + (h.top - s.top) + ')').toBeGreaterThanOrEqual(30);
  });

  it('жёлтый блок начинается у верха страницы', () => {
    expect(box('.summary').top, 'Блок не сдвинут вниз вылезшим отступом').toBeLessThanOrEqual(2);
  });

  it('длинная ссылка не создаёт горизонтальную прокрутку', () => {
    expect(document.documentElement.scrollWidth, 'Ширина страницы').toBeLessThanOrEqual(1024);
    expect(box('.content').right, 'Правый край основной части внутри окна').toBeLessThanOrEqual(1024);
  });

  it('активный пункт меню белый и жирный', () => {
    expect(css('.sidebar a.active', 'color'), 'Цвет активного пункта').toBe('rgb(255, 255, 255)');
    expect(css('.sidebar a.active', 'font-weight'), 'Жирность активного пункта').toBe('700');
    expect(css('.sidebar a:nth-child(2)', 'color'), 'Цвет обычного пункта').toBe('rgb(207, 214, 230)');
  });
});
