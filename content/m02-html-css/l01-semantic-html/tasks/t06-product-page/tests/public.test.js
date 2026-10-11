describe('Каркас страницы товара', () => {
  it('шапка с меню, main и подвал', () => {
    expect($('body > header nav'), 'nav в шапке').not.toBeNull();
    expect($$('main'), 'Тегов main').toHaveLength(1);
    expect($('body > footer'), 'Тег footer в body').not.toBeNull();
  });

  it('товар — article с h1', () => {
    expect($('main > article > h1'), 'h1 прямо в article товара').not.toBeNull();
    expect($('main > article > h1').textContent.trim(), 'Название товара').toBe('Холодильник Atlant XM 4421');
    expect($$('h1'), 'h1 на странице').toHaveLength(1);
  });

  it('фото в figure с подписью и alt', () => {
    expect($('article figure img'), 'img в figure').not.toBeNull();
    expect($('article figure > figcaption').textContent.trim(), 'Подпись').toBe('Atlant XM 4421, вид спереди');
    expect(($('figure img').getAttribute('alt') ?? '').trim().length > 4, 'alt картинки не короче пяти символов').toBe(true);
  });

  it('характеристики — список из четырёх пунктов, кнопка — button', () => {
    expect($$('article > ul > li'), 'Пунктов характеристик').toHaveLength(4);
    expect($('article > button').getAttribute('type'), 'type кнопки').toBe('button');
    expect(labelOf('article > button'), 'Текст кнопки').toBe('Добавить в корзину');
  });

  it('разделы и похожие товары', () => {
    expect($$('article > section > h2').map((h) => h.textContent.trim()), 'Заголовки h2 разделов').toEqual(['Описание', 'Отзывы']);
    expect($$('main > aside a'), 'Ссылок в aside').toHaveLength(3);
  });
});
