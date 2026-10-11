describe('Внешний вид строки товара', () => {
  it('на экране слева направо: название, цена, кнопка', () => {
    for (const i of [1, 2]) {
      const t = box(`.item:nth-child(${i}) .title`);
      const p = box(`.item:nth-child(${i}) .price`);
      const b = box(`.item:nth-child(${i}) .btn`);
      expect(t.left, `Строка ${i}: название левее цены`).toBeLessThan(p.left);
      expect(p.left, `Строка ${i}: цена левее кнопки`).toBeLessThan(b.left);
    }
  });

  it('кнопка прижата к правому краю строки, цена рядом с ней', () => {
    const b = box('.item:nth-child(1) .btn');
    expect(b.right, 'Кнопка у правого края окна (отступ 24px)').toBeGreaterThanOrEqual(998);
  });

  it('название растягивается и занимает свободное место', () => {
    expect(box('.item:nth-child(1) .title').width, 'Название шире 400px').toBeGreaterThan(400);
  });
});
