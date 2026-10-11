describe('таблица по смыслу', () => {
  it('настоящий table с подписью', () => {
    const t = $('table.orders');
    expect(t, 'Нужен элемент table с классом orders').not.toBeNull();
    const cap = t.querySelector('caption');
    expect(cap && cap.textContent.trim().length > 5, 'Нужен caption с названием таблицы').toBe(true);
  });

  it('заголовки колонок — th scope="col" в thead', () => {
    const ths = $$('table.orders thead th');
    expect(ths, 'Заголовков в thead').toHaveLength(5);
    for (const th of ths) expect(th.getAttribute('scope'), `У заголовка «${th.textContent.trim()}» нужен scope="col"`).toBe('col');
  });

  it('строки в tbody, номер заказа — заголовок строки', () => {
    const rows = $$('table.orders tbody tr');
    expect(rows, 'Строк в tbody').toHaveLength(4);
    for (const tr of rows) {
      expect(tr.children, 'В строке пять ячеек').toHaveLength(5);
      expect(tr.children[0].tagName, 'Номер заказа — th').toBe('TH');
      expect(tr.children[0].getAttribute('scope'), 'У номера scope="row"').toBe('row');
      expect([...tr.children].slice(1).every((c) => c.tagName === 'TD'), 'Остальные ячейки — td').toBe(true);
    }
  });

  it('атрибуты data-col сохранены, лишних div нет', () => {
    expect($$('table.orders [data-col]').length, 'Ячеек с data-col').toBe(25);
    expect($$('.orders div').length, 'Внутри таблицы не должно быть div').toBe(0);
  });

  it('статус передан текстом', () => {
    for (const s of $$('.status')) expect(s.textContent.trim().length > 3, 'Статус записан словами, а не одним цветом').toBe(true);
  });
});

describe('прокрутка на узком экране', () => {
  it('контейнер прокручивается и доступен с клавиатуры', () => {
    const w = $('[data-scroll]');
    expect(w.getAttribute('tabindex'), 'Прокручиваемая область получает фокус: tabindex="0"').toBe('0');
    expect(w.getAttribute('role'), 'role=region').toBe('region');
    expect((w.getAttribute('aria-label') ?? '').trim().length > 3, 'У области есть aria-label').toBe(true);
  });

  it('на 375 прокручивается контейнер, а не страница', async () => {
    await viewport(375);
    const w = $('[data-scroll]');
    expect(w.scrollWidth > w.clientWidth + 10, `Таблица должна прокручиваться внутри контейнера: scrollWidth=${w.scrollWidth}, clientWidth=${w.clientWidth}`).toBe(true);
    expect(document.documentElement.scrollWidth <= 376, 'Страница не прокручивается по горизонтали').toBe(true);
    expect(box('[data-table]').width >= 640, `Таблица не уже 640: ${box('[data-table]').width}`).toBe(true);
    await viewport(1024);
  });
});
