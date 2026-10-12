describe('Категория в адресе', () => {
  it('выбор категории меняет адрес и состояние', async () => {
    await type('#category', 'kettles');
    expect(currentUrl(), 'Адрес после выбора «Чайники»').toBe('/?category=kettles');
    expect(history.state, 'Состояние записи').toEqual({ category: 'kettles' });
  });

  it('значение с пробелом и амперсандом кодируется', async () => {
    await type('#category', 'coffee & tea');
    expect(currentUrl(), 'Адрес после выбора «Кофе и чай»').toBe('/?category=coffee+%26+tea');
    const params = new URLSearchParams(currentUrl().split('?')[1]);
    expect(params.get('category'), 'Параметр читается обратно без потерь').toBe('coffee & tea');
  });
});
