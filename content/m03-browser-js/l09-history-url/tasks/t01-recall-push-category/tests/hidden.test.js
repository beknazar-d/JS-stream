describe('История браузера', () => {
  it('каждый выбор создаёт новую запись, «Назад» возвращает предыдущую', async () => {
    const before = window.__history.entries.length;
    await type('#category', 'blenders');
    await type('#category', 'all');
    expect(window.__history.entries.length, 'Добавилось две записи в историю').toBe(before + 2);
    history.back();
    await waitFor(() => currentUrl() === '/?category=blenders', 500);
    expect(history.state, 'Состояние предыдущей записи').toEqual({ category: 'blenders' });
  });

  it('состояние содержит выбранное значение', async () => {
    await type('#category', 'coffee & tea');
    expect(history.state, 'В состоянии то же значение, что в списке').toEqual({ category: 'coffee & tea' });
  });
});
