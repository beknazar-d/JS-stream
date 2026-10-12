describe('имена элементов', () => {
  it('у поля поиска есть имя', () => {
    expect(labelOf('.search'), 'Доступное имя поля поиска').toBe('Поиск по магазину');
    expect($('label[for="q"]'), 'Нужен label, связанный с полем по for и id').not.toBeNull();
  });

  it('у кнопок со значками есть имена', () => {
    expect(labelOf('.icon-button--fav'), 'Имя кнопки «Избранное»').toBe('Избранное');
    expect(labelOf('.icon-button--cart'), 'Имя кнопки «Корзина»').toBe('Корзина');
  });

  it('значки скрыты от скринридера', () => {
    for (const svg of $$('.icon-button svg')) {
      expect(svg.getAttribute('aria-hidden'), 'У svg внутри кнопки должен быть aria-hidden="true"').toBe('true');
    }
  });
});

describe('картинки', () => {
  it('у фотографий товаров есть alt', () => {
    const photos = $$('.product__photo');
    expect(photos, 'Фотографий товаров на странице').toHaveLength(3);
    for (const photo of photos) {
      expect(photo.getAttribute('alt') ?? '', 'alt фотографии товара не должен быть пустым').not.toBe('');
    }
  });

  it('декоративная линия имеет пустой alt', () => {
    expect($('.divider').getAttribute('alt'), 'У декоративной линии должен быть alt="" (атрибут есть, значение пустое)').toBe('');
  });
});
