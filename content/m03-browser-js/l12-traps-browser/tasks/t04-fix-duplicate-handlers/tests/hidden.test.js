const qty = (id) => Number($('li[data-id="' + id + '"] .qty').textContent);
const plus = (id) => click('li[data-id="' + id + '"] [data-action="inc"]');
const minus = (id) => click('li[data-id="' + id + '"] [data-action="dec"]');

describe('Перерисовка и обработчики', () => {
  it('после нескольких нажатий на «Обновить» клик по «+» добавляет одну штуку', async () => {
    await click('#refresh');
    await click('#refresh');
    await click('#refresh');
    const start = qty(2);
    await plus(2);
    expect(qty(2), 'Один клик по «+» после трёх обновлений списка').toBe(start + 1);
  });

  it('«−» уменьшает на 1 и не опускает ниже 1', async () => {
    const start = qty(2);
    await minus(2);
    expect(qty(2), 'Один клик по «−»').toBe(start - 1);
    for (let i = 0; i < start + 3; i++) await minus(2);
    expect(qty(2), 'Количество не может быть меньше 1').toBe(1);
  });

  it('позиции не влияют друг на друга', async () => {
    const first = qty(1);
    const second = qty(2);
    await plus(2);
    expect(qty(1), 'Первая позиция не изменилась').toBe(first);
    expect(qty(2), 'Вторая позиция выросла на 1').toBe(second + 1);
  });

  it('итог пересчитывается после каждого клика', async () => {
    await plus(1);
    expect($('#total').textContent, 'Итог после клика').toBe('Всего штук: ' + (qty(1) + qty(2)));
  });

  it('список перерисовывается, а не остаётся прежним', async () => {
    const before = $$('li[data-id]').length;
    await plus(1);
    expect($$('li[data-id]'), 'Позиций в списке после клика по-прежнему две').toHaveLength(before);
  });
});
