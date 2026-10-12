describe('Запоминание сортировки: тонкости', () => {
  it('значение по умолчанию тоже сохраняется', async () => {
    await type('#sort', 'rating');
    await type('#sort', 'popular');
    expect(localStorage.getItem('sort'), 'После возврата к popular в хранилище должно лежать popular').toBe('popular');
  });

  it('значение записывается обычной строкой, без кавычек JSON', async () => {
    await type('#sort', 'price-asc');
    expect(localStorage.getItem('sort'), 'Ожидалась строка price-asc без кавычек').toBe('price-asc');
  });

  it('sessionStorage не используется', async () => {
    await type('#sort', 'price-desc');
    expect(sessionStorage.getItem('sort'), 'В sessionStorage по ключу sort ничего не должно быть').toBeNull();
    expect(sessionStorage.length, 'sessionStorage пуст').toBe(0);
  });
});
