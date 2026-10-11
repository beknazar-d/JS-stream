const near = (a, b) => Math.abs(a - b) <= 2;

describe('Отступы внутри баннера', () => {
  it('сверху 24px от границы баннера до заголовка', () => {
    const gap = box('.banner-title').top - box('.banner').top;
    expect(near(gap, 24), `Расстояние от верха баннера до заголовка: ${gap}, ожидалось 24`).toBe(true);
  });

  it('снизу 24px от абзаца до границы баннера', () => {
    const gap = box('.banner').bottom - box('.banner-text').bottom;
    expect(near(gap, 24), `Расстояние от абзаца до низа баннера: ${gap}, ожидалось 24`).toBe(true);
  });
});
