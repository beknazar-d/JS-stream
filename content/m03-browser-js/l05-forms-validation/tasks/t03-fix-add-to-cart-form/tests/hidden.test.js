const summary = () => $('#summary').textContent.trim();

describe('Форма «Добавить в корзину»: граничные случаи', () => {
  it('количество 1 по умолчанию', async () => {
    $('#gift').checked = false;
    await type('#qty', '1');
    await submit('#add-form');
    expect(summary(), 'Одна штука без упаковки').toBe('Итого: 3490 ₽');
  });

  it('снятая отметка убирает пометку', async () => {
    await type('#qty', '3');
    await click('#gift');
    await submit('#add-form');
    expect(summary(), 'Отметили упаковку').toBe('Итого: 10470 ₽, подарочная упаковка');
    await click('#gift');
    await submit('#add-form');
    expect(summary(), 'Сняли отметку').toBe('Итого: 10470 ₽');
  });

  it('форма остаётся формой с полем qty', () => {
    expect($('form#add-form'), 'Форма #add-form').not.toBeNull();
    expect(new FormData($('#add-form')).get('qty'), 'Поле количества попадает в FormData').not.toBeNull();
  });
});
