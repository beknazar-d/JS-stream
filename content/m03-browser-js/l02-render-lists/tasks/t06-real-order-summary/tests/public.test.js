const text = (sel) => $(sel).textContent.replace(/\s/g, ' ').trim();

describe('Сводка заказа при загрузке', () => {
  it('покупатель и адрес', () => {
    expect(text('.greeting'), 'Приветствие').toBe('Заказ для Мария Иванова');
    expect(text('.address'), 'Адрес').toBe('Доставка: Москва, ул. Лесная, 5');
  });

  it('строки таблицы', () => {
    const rows = $$('tbody .order-row');
    expect(rows, 'Количество строк').toHaveLength(2);
    expect(rows.map((r) => r.querySelector('.order-row__title').textContent), 'Названия').toEqual(['Чайник K-200', 'Блендер B-50']);
    expect(rows.map((r) => r.querySelector('.order-row__qty').textContent.trim()), 'Количество').toEqual(['1', '2']);
    expect(rows.map((r) => r.querySelector('.order-row__sum').textContent.replace(/\s/g, ' ').trim()), 'Суммы строк').toEqual(['2 990 ₽', '9 980 ₽']);
  });

  it('итоги с промокодом', () => {
    expect(text('.subtotal'), 'Сумма товаров 2990 + 9980').toBe('12 970 ₽');
    expect($('.promo-row').hidden, 'Строка скидки показана').toBe(false);
    expect(text('.discount'), 'Скидка 10% от 12970 = 1297').toBe('-1 297 ₽');
    expect(text('.delivery'), 'После скидки больше 5000: бесплатно').toBe('Бесплатно');
    expect(text('.grand-total'), 'Итого 12970 - 1297').toBe('11 673 ₽');
  });

  it('блок «пусто» скрыт', () => {
    expect($('.order-empty').hidden, 'Сообщение о пустом заказе скрыто').toBe(true);
    expect($('.order-table').hidden, 'Таблица показана').toBe(false);
  });
});
