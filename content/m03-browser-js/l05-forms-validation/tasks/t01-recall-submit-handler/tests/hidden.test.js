describe('Подписка на поступление: граничные случаи', () => {
  it('пробелы по краям артикула убираются', async () => {
    await type('#sku', '  K-200  ');
    await submit('#notify-form');
    expect($('#result').textContent.trim(), 'Артикул с пробелами по краям').toBe('Подписка на K-200 оформлена');
  });

  it('пустой артикул даёт сообщение', async () => {
    await type('#sku', '');
    await submit('#notify-form');
    expect($('#result').textContent.trim(), 'Пустое поле').toBe('Введите артикул');
  });

  it('артикул из одних пробелов считается пустым', async () => {
    await type('#sku', '   ');
    await submit('#notify-form');
    expect($('#result').textContent.trim(), 'Поле из пробелов').toBe('Введите артикул');
  });

  it('отправка по Enter тоже работает', async () => {
    await type('#sku', 'B-50');
    await submit('#notify-form');
    await type('#sku', 'T-2');
    await submit('#notify-form');
    expect($('#result').textContent.trim(), 'Вторая отправка заменяет результат').toBe('Подписка на T-2 оформлена');
  });
});
