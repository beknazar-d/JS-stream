const text = (sel) => $(sel).textContent.replace(/\s/g, ' ').trim();
const one = (price, qty = 1) => ({ title: 'Товар', qty, price });

describe('Расчёты и состояния', () => {
  it('без промокода: скидки нет, доставка платная для малого заказа', () => {
    renderOrder({ customer: 'А', address: 'Б', items: [one(1200, 2)] });
    expect($('.promo-row').hidden, 'Строка скидки скрыта').toBe(true);
    expect(text('.subtotal'), 'Сумма товаров').toBe('2 400 ₽');
    expect(text('.delivery'), 'Доставка 390 ₽').toBe('390 ₽');
    expect(text('.grand-total'), 'Итого 2400 + 390').toBe('2 790 ₽');
  });

  it('порог бесплатной доставки включительный', () => {
    renderOrder({ customer: 'А', address: 'Б', items: [one(5000)] });
    expect(text('.delivery'), 'Ровно 5000 ₽ — бесплатно').toBe('Бесплатно');
    expect(text('.grand-total'), 'Итого').toBe('5 000 ₽');
  });

  it('порог считается после скидки', () => {
    renderOrder({ customer: 'А', address: 'Б', items: [one(5200)], promoCode: 'DOM10' });
    expect(text('.discount'), 'Скидка 520').toBe('-520 ₽');
    expect(text('.delivery'), 'После скидки 4680 ₽ меньше порога').toBe('390 ₽');
    expect(text('.grand-total'), 'Итого 4680 + 390').toBe('5 070 ₽');
  });

  it('неизвестный промокод игнорируется', () => {
    renderOrder({ customer: 'А', address: 'Б', items: [one(1000)], promoCode: 'SALE50' });
    expect($('.promo-row').hidden, 'Строка скидки скрыта').toBe(true);
    expect(text('.subtotal'), 'Сумма товаров').toBe('1 000 ₽');
  });

  it('скидка округляется до рубля', () => {
    renderOrder({ customer: 'А', address: 'Б', items: [one(1234)], promoCode: 'DOM10' });
    expect(text('.discount'), '123,4 → 123').toBe('-123 ₽');
  });

  it('повторный вызов заменяет строки', () => {
    renderOrder({ customer: 'А', address: 'Б', items: [one(100), one(200)] });
    expect($$('tbody .order-row'), 'Две строки').toHaveLength(2);
    renderOrder({ customer: 'А', address: 'Б', items: [one(300)] });
    expect($$('tbody .order-row'), 'Одна строка после второго вызова').toHaveLength(1);
  });

  it('пустой заказ', () => {
    renderOrder({ customer: 'А', address: 'Б', items: [] });
    expect($('.order-empty').hidden, 'Сообщение показано').toBe(false);
    expect($('.order-table').hidden, 'Таблица скрыта').toBe(true);
    expect(text('.subtotal'), 'Сумма').toBe('0 ₽');
    expect(text('.delivery'), 'Доставка').toBe('—');
    expect(text('.grand-total'), 'Итого').toBe('0 ₽');
    expect($('.promo-row').hidden, 'Скидка скрыта').toBe(true);
  });

  it('после пустого заказа обычный возвращает таблицу', () => {
    renderOrder({ customer: 'А', address: 'Б', items: [one(700)] });
    expect($('.order-empty').hidden, 'Сообщение скрыто').toBe(true);
    expect($('.order-table').hidden, 'Таблица показана').toBe(false);
    expect(text('.delivery'), 'Доставка').toBe('390 ₽');
  });
});

describe('Безопасность и шаблон', () => {
  it('данные покупателя остаются текстом', async () => {
    renderOrder({
      customer: '<img src=x onerror="window.__pwned = true">',
      address: '<b>ул. Лесная</b>',
      items: [{ title: 'Тостер <i>T-2</i>', qty: 1, price: 2190 }],
    });
    await wait(100);
    expect(window.__pwned, 'Чужой код не выполнился').toBeUndefined();
    expect($('.greeting').textContent, 'Имя как текст').toBe('Заказ для <img src=x onerror="window.__pwned = true">');
    expect($('.address').textContent, 'Адрес как текст').toBe('Доставка: <b>ул. Лесная</b>');
    expect($('.order-row__title').textContent, 'Название как текст').toBe('Тостер <i>T-2</i>');
    expect($$('.greeting *, .address *, tbody i'), 'Лишних элементов нет').toHaveLength(0);
  });

  it('шаблон строки не изменён', () => {
    const tpl = $('#row-template').content;
    expect(tpl.querySelector('.order-row__title').textContent, 'Название в шаблоне пусто').toBe('');
    expect(tpl.querySelectorAll('tr'), 'В шаблоне одна строка').toHaveLength(1);
  });
});
