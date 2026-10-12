describe('Карточка товара', () => {
  it('заголовок и цена заполнены', () => {
    expect($('.product-title').textContent.trim(), 'Текст заголовка').toBe('Чайник K-200');
    expect($('.price').textContent.trim(), 'Текст цены').toBe('3 490 ₽');
  });

  it('бейдж показан и помечен классом скидки', () => {
    const badge = $('#promo-badge');
    expect(badge.hidden, 'У бейджа не должно остаться атрибута hidden').toBe(false);
    expect(badge.classList.contains('badge--sale'), 'Класс badge--sale добавлен').toBe(true);
  });

  it('ссылка ведёт на добавление товара', () => {
    const link = $('.buy-link');
    expect(link.getAttribute('href'), 'Атрибут href').toBe('/cart/add?id=k200');
    expect(link.getAttribute('data-product-id'), 'Атрибут data-product-id').toBe('k200');
  });
});
