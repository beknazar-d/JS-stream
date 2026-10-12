describe('Пропорции и большой экран', () => {
  it('на 375px фото сохраняет пропорции 2 к 1', async () => {
    await viewport(375);
    const photo = box('.product__photo');
    expect(photo.width, 'Фото должно занять доступную ширину, а не сжаться в точку').toBeGreaterThan(300);
    expect(Math.abs(photo.height * 2 - photo.width), 'Высота должна быть вдвое меньше ширины (2 к 1). Уберите фиксированную высоту: height: auto').toBeLessThanOrEqual(4);
    await viewport(1024);
  });

  it('на 1024px фото не растягивается больше своего размера 800px', () => {
    const photo = box('.product__photo');
    expect(photo.width, 'На широком экране фото не должно становиться больше 800px').toBeLessThanOrEqual(802);
    expect(photo.width, 'На широком экране фото должно оставаться 800px').toBeGreaterThanOrEqual(798);
  });

  it('на 768px фото целиком помещается', async () => {
    await viewport(768);
    expect(box('.product__photo').right, 'Правый край фото на экране 768px').toBeLessThanOrEqual(768);
    await viewport(1024);
  });
});
