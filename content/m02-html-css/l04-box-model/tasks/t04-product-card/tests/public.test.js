const near = (a, b) => Math.abs(a - b) <= 2;

describe('Карточка по макету', () => {
  it('ширина 320px и положение на странице', () => {
    const card = box('.card');
    expect(near(card.width, 320), `Ширина карточки: ${card.width}, ожидалось 320`).toBe(true);
    expect(near(card.left, 24), `Левый край карточки: ${card.left}, ожидалось 24`).toBe(true);
    expect(near(card.top, 24), `Верхний край карточки: ${card.top}, ожидалось 24`).toBe(true);
  });

  it('фото внутри карточки', () => {
    const card = box('.card');
    const photo = box('.photo');
    expect(near(photo.left - card.left, 17), `Фото от левого края карточки: ${photo.left - card.left}, ожидалось 17`).toBe(true);
    expect(near(photo.top - card.top, 17), `Фото от верхнего края карточки: ${photo.top - card.top}, ожидалось 17`).toBe(true);
    expect(near(photo.width, 286), `Ширина фото: ${photo.width}, ожидалось 286`).toBe(true);
    expect(near(photo.height, 160), `Высота фото: ${photo.height}, ожидалось 160`).toBe(true);
  });
});
