const qty = (id) => Number($('li[data-id="' + id + '"] .qty').textContent);
const plus = (id) => click('li[data-id="' + id + '"] [data-action="inc"]');
const minus = (id) => click('li[data-id="' + id + '"] [data-action="dec"]');

describe('Кнопка «+»', () => {
  it('три клика увеличивают количество на 3', async () => {
    const start = qty(1);
    await plus(1);
    await plus(1);
    await plus(1);
    expect(qty(1), 'Количество первой позиции после трёх кликов по «+»').toBe(start + 3);
  });

  it('итог равен сумме количеств', () => {
    expect($('#total').textContent, 'Итог под списком').toBe('Всего штук: ' + (qty(1) + qty(2)));
  });
});
