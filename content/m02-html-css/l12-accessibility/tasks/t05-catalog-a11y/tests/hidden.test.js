describe('кнопки и порядок Tab', () => {
  it('«В корзину» — настоящие кнопки', () => {
    const buttons = $$('.product__buy');
    expect(buttons, 'Кнопок «В корзину»').toHaveLength(3);
    for (const b of buttons) {
      expect(b.tagName, 'Кнопка «В корзину» должна быть элементом button').toBe('BUTTON');
      expect(b.getAttribute('type'), 'type кнопки').toBe('button');
    }
  });

  it('кнопки принимают фокус', () => {
    const b = $('.product__buy');
    b.focus();
    expect(document.activeElement === b, 'Кнопка «В корзину» должна принимать фокус').toBe(true);
    b.blur();
  });

  it('положительных tabindex нет', () => {
    const bad = $$('[tabindex]').filter((el) => Number(el.getAttribute('tabindex')) > 0);
    expect(bad.length, 'Элементов с положительным tabindex: ' + bad.map((e) => e.className).join(', ')).toBe(0);
  });

  it('role не добавлена туда, где хватает элемента', () => {
    expect($$('[role="button"]').length, 'Не нужно role="button": используйте настоящий button').toBe(0);
  });
});

describe('качество описаний', () => {
  it('alt не состоит из общих слов', () => {
    const generic = /^(картинка|фото|изображение|image|photo|img|рисунок|товар)\.?$/i;
    for (const photo of $$('.product__photo')) {
      const alt = photo.getAttribute('alt') ?? '';
      expect(generic.test(alt.trim()), `alt «${alt}» ничего не сообщает`).toBe(false);
      expect(alt.trim().length >= 12, `alt «${alt}» слишком короткий: нужно название и примета`).toBe(true);
    }
  });

  it('alt называет товар', () => {
    const photos = $$('.product__photo');
    const titles = $$('.product__title').map((t) => t.textContent.trim());
    photos.forEach((photo, i) => {
      const model = titles[i].split(' ').pop();
      expect(photo.getAttribute('alt').includes(model), `alt фотографии №${i + 1} должен содержать модель «${model}»`).toBe(true);
    });
  });

  it('имена ссылок «Подробнее» различаются', () => {
    const names = $$('.product__more').map((a) => labelOf(a));
    expect(new Set(names).size, `Имена ссылок: ${names.join(' | ')}`).toBe(3);
    const titles = $$('.product__title').map((t) => t.textContent.trim());
    names.forEach((name, i) => {
      expect(name.includes(titles[i]), `Имя ссылки №${i + 1} должно содержать «${titles[i]}», сейчас «${name}»`).toBe(true);
      expect(name.startsWith('Подробнее'), 'Имя ссылки начинается со слов «Подробнее»').toBe(true);
    });
  });

  it('вид страницы не изменился', () => {
    expect(box('.product').width, 'Ширина карточки').toBeGreaterThan(190);
    expect(css('.product__buy', 'background-color'), 'Цвет кнопки').toBe('rgb(11, 61, 145)');
    expect(box('.divider').height, 'Высота линии').toBe(4);
  });
});
