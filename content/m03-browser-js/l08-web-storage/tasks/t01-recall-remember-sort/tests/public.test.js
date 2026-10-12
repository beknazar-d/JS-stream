describe('Запоминание сортировки', () => {
  it('при загрузке выбран пункт из localStorage', () => {
    expect($('#sort').value, 'В localStorage лежит price-desc, значит, выбран «Сначала дорогие»').toBe('price-desc');
  });

  it('выбор пункта записывается в localStorage', async () => {
    await type('#sort', 'rating');
    expect(localStorage.getItem('sort'), 'После выбора «По рейтингу» в ключе sort должно лежать rating').toBe('rating');
  });
});
