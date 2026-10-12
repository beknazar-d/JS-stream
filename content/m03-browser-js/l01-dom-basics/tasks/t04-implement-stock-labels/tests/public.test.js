const stockOf = (n) => $(`.card:nth-child(${n}) .stock`).textContent.trim();
const buyOf = (n) => $(`.card:nth-child(${n}) .buy`);

describe('Подписи наличия', () => {
  it('много на складе: «В наличии»', () => {
    expect(stockOf(1), 'Подпись первой карточки, остаток 12').toBe('В наличии');
  });

  it('мало на складе: «Осталось: N шт.»', () => {
    expect(stockOf(2), 'Подпись второй карточки, остаток 3').toBe('Осталось: 3 шт.');
  });

  it('нет на складе: подпись, класс и выключенная кнопка', () => {
    expect(stockOf(3), 'Подпись третьей карточки, остаток 0').toBe('Нет в наличии');
    expect($('.card:nth-child(3)').classList.contains('card--out'), 'Класс card--out у карточки с нулевым остатком').toBe(true);
    expect(buyOf(3).disabled, 'Кнопка при нулевом остатке отключена').toBe(true);
  });

  it('есть на складе: кнопка работает', () => {
    expect(buyOf(1).disabled, 'Кнопка при остатке 12 включена').toBe(false);
    expect($('.card:nth-child(1)').classList.contains('card--out'), 'Нет класса card--out при остатке 12').toBe(false);
  });
});
