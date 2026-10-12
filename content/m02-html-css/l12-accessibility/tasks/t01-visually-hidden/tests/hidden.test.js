describe('.visually-hidden: краевые случаи', () => {
  it('не использует visibility: hidden', () => {
    expect(css('.visually-hidden', 'visibility'), 'visibility скрытого текста').toBe('visible');
  });

  it('текст обрезан, а не торчит наружу', () => {
    const hidden = css('.visually-hidden', 'overflow-x') !== 'visible';
    const clipped = css('.visually-hidden', 'clip-path') !== 'none' || css('.visually-hidden', 'clip') !== 'auto';
    expect(hidden || clipped, 'Нужен overflow: hidden или clip / clip-path, иначе текст виден').toBe(true);
  });

  it('длинная подпись не растягивает блок', () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:120px;position:relative;';
    wrap.innerHTML = '<span class="visually-hidden">Добавить в избранное: холодильник Домотека ХД-320 серебристый</span><b id="probe">Цена</b>';
    document.body.append(wrap);
    const span = wrap.querySelector('.visually-hidden');
    const r = span.getBoundingClientRect();
    expect(r.width <= 2 && r.height <= 2, `Длинная подпись заняла ${Math.round(r.width)} на ${Math.round(r.height)}px`).toBe(true);
    expect(wrap.getBoundingClientRect().height < 40, 'Блок вокруг подписи не должен вырасти из-за скрытого текста').toBe(true);
    wrap.remove();
  });

  it('текст не вынесен за экран', () => {
    const r = box('.visually-hidden');
    expect(r.left > -100 && r.top > -100, 'Не уводите текст за экран через отрицательные координаты').toBe(true);
  });

  it('значок остался на месте внутри кнопки', () => {
    const icon = box('.icon-button svg');
    const btn = box('.icon-button');
    expect(Math.abs(icon.left - btn.left - 10) <= 2, 'Значок отстоит от края кнопки на 10px').toBe(true);
  });
});
