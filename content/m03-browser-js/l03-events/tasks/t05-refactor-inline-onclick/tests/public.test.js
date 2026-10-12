describe('Разметка без inline-обработчиков', () => {
  it('нет атрибутов onclick', () => {
    expect($$('[onclick]'), 'Элементы с атрибутом onclick').toHaveLength(0);
  });

  it('у кнопок покупки есть data-id', () => {
    expect($$('.buy').map((b) => b.dataset.id), 'Идентификаторы на кнопках').toEqual(['k200', 'b50', 't2']);
  });
});

describe('Поведение страницы', () => {
  it('клик по кнопке добавляет товар', async () => {
    await click('.buy[data-id="k200"]');
    expect($('#summary').textContent.trim(), 'Счётчик после первого клика').toBe('В корзине: 1 шт.');
    expect($('#last').textContent.trim(), 'Последний товар').toBe('Последний товар: Чайник K-200');
  });

  it('счётчик общий для всех кнопок', async () => {
    await click('.buy[data-id="b50"]');
    await click('.buy[data-id="t2"]');
    expect($('#summary').textContent.trim(), 'Счётчик после трёх кликов').toBe('В корзине: 3 шт.');
    expect($('#last').textContent.trim(), 'Последний товар').toBe('Последний товар: Тостер T-2');
  });

  it('промокод применяется', async () => {
    await click('#promo-btn');
    expect($('#promo-status').textContent.trim(), 'Статус промокода').toBe('Скидка: 10%');
  });
});
