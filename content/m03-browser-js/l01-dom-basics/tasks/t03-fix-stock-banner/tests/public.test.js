describe('Страница товара после скрипта', () => {
  it('заголовок главного товара обновлён', () => {
    expect($('main h1').textContent.trim(), 'Текст заголовка h1').toBe('Блендер B-50');
  });

  it('бейдж скидки показан', () => {
    const badge = $('.sale-badge');
    expect(badge.classList.contains('visible'), 'У бейджа есть класс visible').toBe(true);
    expect(css('.sale-badge', 'display'), 'Бейдж не скрыт на экране').not.toBe('none');
  });

  it('подпись наличия обновлена', () => {
    expect($('.stock-note').textContent.trim(), 'Текст подписи').toBe('Осталось 3 шт.');
  });
});
