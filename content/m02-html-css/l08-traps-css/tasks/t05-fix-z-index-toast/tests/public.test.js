describe('Уведомление в углу окна', () => {
  it('в правом нижнем углу окна 1024×768 с отступом 16px', () => {
    const t = box('.toast');
    expect(Math.abs(t.right - (1024 - 16)), 'Правый край уведомления (сейчас ' + t.right + ')').toBeLessThanOrEqual(2);
    expect(Math.abs(t.bottom - (768 - 16)), 'Нижний край уведомления (сейчас ' + t.bottom + ')').toBeLessThanOrEqual(2);
  });

  it('уведомление поверх слайдера', () => {
    const t = box('.toast');
    const el = document.elementFromPoint(t.left + t.width / 2, t.top + t.height / 2);
    expect(el && el.closest('.toast') !== null, 'В центре уведомления видно само уведомление, а не слайдер').toBe(true);
  });
});
