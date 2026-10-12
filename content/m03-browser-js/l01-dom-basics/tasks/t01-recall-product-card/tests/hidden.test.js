describe('Граничные случаи', () => {
  it('бейдж остался с исходным классом badge', () => {
    expect($('#promo-badge').classList.contains('badge'), 'Класс badge не должен пропасть при добавлении badge--sale').toBe(true);
  });

  it('бейдж реально виден на экране', () => {
    expect(css('#promo-badge', 'display'), 'Вычисленный display бейджа').not.toBe('none');
    expect(box('#promo-badge').width, 'Ширина бейджа').toBeGreaterThan(0);
  });

  it('элементы не заменены и не добавлены', () => {
    expect($$('.product-title'), 'Один заголовок').toHaveLength(1);
    expect($$('.badge'), 'Один бейдж').toHaveLength(1);
    expect($$('.buy-link'), 'Одна ссылка').toHaveLength(1);
    expect($('.product-title').tagName, 'Тег заголовка не изменился').toBe('H1');
  });
});
