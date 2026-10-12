const panel = () => box('.panel');

describe('Карточки внутри панели', () => {
  it('панель шириной 400px', () => {
    expect(panel().width, 'Ширина панели').toBe(400);
  });

  it('карточки не вылезают за правый край', () => {
    for (const [index, card] of $$('.card').entries()) {
      expect(box(card).right <= panel().right + 1, `Правый край карточки ${index + 1}: ${box(card).right}, правый край панели: ${panel().right}`).toBe(true);
      expect(Math.abs(box(card).width - 400) <= 2, `Ширина карточки ${index + 1}: ${box(card).width}, ожидалось 400`).toBe(true);
    }
  });

  it('поле поиска помещается в панель', () => {
    expect(box('.search').right <= panel().right + 1, `Правый край поля поиска: ${box('.search').right}`).toBe(true);
    expect(Math.abs(box('.search').width - 400) <= 2, `Ширина поля поиска: ${box('.search').width}`).toBe(true);
  });
});
