describe('Фото товара на телефоне', () => {
  it('на экране 375px фото не выходит за правый край', async () => {
    await viewport(375);
    const photo = box('.product__photo');
    expect(photo.right, 'Правый край фото должен быть не дальше ширины экрана 375px').toBeLessThanOrEqual(375);
    await viewport(1024);
  });

  it('на экране 375px у страницы нет горизонтальной прокрутки', async () => {
    await viewport(375);
    expect(document.documentElement.scrollWidth, 'Ширина содержимого страницы при экране 375px').toBeLessThanOrEqual(375);
    await viewport(1024);
  });
});
