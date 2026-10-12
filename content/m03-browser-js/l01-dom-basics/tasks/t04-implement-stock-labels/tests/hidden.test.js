const fresh = (stock) => {
  const card = $('.card:nth-child(1)').cloneNode(true);
  if (stock === undefined) card.removeAttribute('data-stock');
  else card.dataset.stock = String(stock);
  $('.catalog').append(card);
  return card;
};

describe('Граничные случаи', () => {
  it('нет атрибута data-stock: «Уточняйте наличие», кнопка включена', () => {
    const card = fresh(undefined);
    updateStock(card);
    expect(card.querySelector('.stock').textContent.trim(), 'Подпись без данных').toBe('Уточняйте наличие');
    expect(card.querySelector('.buy').disabled, 'Кнопка без данных не отключается').toBe(false);
    expect(card.classList.contains('card--out'), 'Без данных карточка не серая').toBe(false);
    card.remove();
  });

  it('граница: 5 штук — ещё «Осталось», 6 штук — «В наличии»', () => {
    const five = fresh(5);
    const six = fresh(6);
    updateStock(five);
    updateStock(six);
    expect(five.querySelector('.stock').textContent.trim(), 'Остаток 5').toBe('Осталось: 5 шт.');
    expect(six.querySelector('.stock').textContent.trim(), 'Остаток 6').toBe('В наличии');
    five.remove();
    six.remove();
  });

  it('остаток 1: «Осталось: 1 шт.»', () => {
    const card = fresh(1);
    updateStock(card);
    expect(card.querySelector('.stock').textContent.trim(), 'Остаток 1').toBe('Осталось: 1 шт.');
    card.remove();
  });

  it('повторный вызов после пополнения склада снимает отметки', () => {
    const card = fresh(0);
    updateStock(card);
    expect(card.querySelector('.buy').disabled, 'Сначала кнопка отключена').toBe(true);
    card.dataset.stock = '4';
    updateStock(card);
    expect(card.querySelector('.stock').textContent.trim(), 'Подпись после пополнения').toBe('Осталось: 4 шт.');
    expect(card.querySelector('.buy').disabled, 'Кнопка снова включена').toBe(false);
    expect(card.classList.contains('card--out'), 'Класс card--out снят').toBe(false);
    card.remove();
  });

  it('вызов для одной карточки не трогает остальные', () => {
    const before = $$('.stock').map((el) => el.textContent);
    const card = fresh(2);
    updateStock(card);
    expect($$('.stock').slice(0, before.length).map((el) => el.textContent), 'Подписи прежних карточек').toEqual(before);
    card.remove();
  });
});
