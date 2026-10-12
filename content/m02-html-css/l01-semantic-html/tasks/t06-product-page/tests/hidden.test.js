describe('Страница товара: детали', () => {
  it('отзывы — вложенные article с h3, time и абзацем', () => {
    const reviews = $$('section article');
    expect(reviews, 'Отзывов (article внутри section)').toHaveLength(2);
    expect(reviews.map((r) => r.querySelector('h3')?.textContent.trim()), 'Авторы в h3').toEqual(['Марина К.', 'Игорь С.']);
    expect(reviews.map((r) => r.querySelector('time')?.getAttribute('datetime')), 'Атрибуты datetime').toEqual(['2026-03-14', '2026-04-02']);
    expect(reviews[0].querySelectorAll('p').length >= 1, 'В отзыве есть абзац').toBe(true);
  });

  it('заголовки идут без пропусков', () => {
    const l = $$('h1, h2, h3, h4, h5, h6').map((h) => Number(h.tagName[1]));
    expect(l, 'Уровни заголовков по порядку').toEqual([1, 2, 2, 3, 3, 2]);
  });

  it('ссылки ведут по нужным адресам', () => {
    const hrefs = $$('a').map((a) => a.getAttribute('href'));
    expect(hrefs, 'Адреса всех ссылок').toEqual(['/', '/catalog', '/cart', '/contacts', '/catalog/4424', '/catalog/4180', '/catalog/b419', '/privacy']);
  });

  it('у меню есть имя, список меню — ul', () => {
    expect(($('header nav').getAttribute('aria-label') ?? '').trim().length > 0, 'aria-label у nav').toBe(true);
    expect($$('header nav ul > li > a'), 'Пунктов меню в списке').toHaveLength(3);
  });

  it('тексты на месте', () => {
    const t = document.body.textContent.replace(/\s+/g, ' ');
    for (const s of ['Домотека', '41 990 ₽', 'Объём 312 л', 'Класс A+', 'Высота 186 см', 'No Frost', 'Двухкамерный холодильник с системой No Frost. Не требует разморозки, тихо работает', '14 марта 2026', '2 апреля 2026', 'Тихий, вместительный, доставили вовремя', 'Дверь пришлось перевесить, в остальном без нареканий', 'Похожие товары', 'Atlant XM 4424', 'Indesit DF 4180', 'LG GA-B419', '© Домотека, 2026', 'Политика конфиденциальности']) {
      expect(t, `Текст «${s}»`).toContain(s);
    }
  });

  it('подвал и aside на месте, div не нужен', () => {
    expect($('main > aside > ul'), 'Список в aside').not.toBeNull();
    expect($('footer a').getAttribute('href'), 'Ссылка в подвале').toBe('/privacy');
    expect($$('div'), 'Тегов div').toHaveLength(0);
  });
});
