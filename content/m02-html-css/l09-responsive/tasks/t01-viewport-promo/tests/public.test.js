describe('Метатег viewport', () => {
  it('в head есть meta name="viewport"', () => {
    const meta = $('meta[name="viewport"]');
    expect(meta, 'Добавьте в head тег meta с name="viewport"').not.toBeNull();
  });

  it('в viewport указано width=device-width и initial-scale=1', () => {
    const content = $('meta[name="viewport"]')?.getAttribute('content') ?? '';
    expect(content, 'Значение content метатега viewport').toMatch(/width=device-width/);
    expect(content, 'Значение content метатега viewport').toMatch(/initial-scale=1/);
  });
});

describe('Плашка про доставку', () => {
  it('на телефоне (375px) плашки нет', async () => {
    await viewport(375);
    expect(css('.promo', 'display'), 'На экране 375px плашка скрыта').toBe('none');
    await viewport(1024);
  });

  it('на планшете (768px) плашка видна', async () => {
    await viewport(768);
    expect(css('.promo', 'display'), 'На экране 768px плашка уже показывается').toBe('block');
    await viewport(1024);
  });

  it('на компьютере (1024px) плашка видна', () => {
    expect(css('.promo', 'display'), 'На экране 1024px плашка показывается').toBe('block');
  });
});
