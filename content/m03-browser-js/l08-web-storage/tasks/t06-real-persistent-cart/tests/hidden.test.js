const rows = () => $$('#cart-items li');
const row = (id) => $(`#cart-items li[data-id="${id}"]`);
const qtyOf = (id) => Number(row(id).querySelector('.qty').textContent.trim());
const stored = () => JSON.parse(localStorage.getItem('cart'));
const digits = (selector) => Number($(selector).textContent.replace(/\D/g, ''));

describe('Корзина: тонкости', () => {
  it('минус уменьшает количество, пока оно больше 1', async () => {
    // К этому моменту в корзине: чайник × 3 и блендер × 2.
    await click('#cart-items li[data-id="1"] .dec');
    expect(qtyOf(1), 'Было 3, стало 2').toBe(2);
    expect(stored().find((item) => item.id === 1), 'Новое количество сохранено').toEqual({ id: 1, qty: 2 });
    expect($('#cart-count').textContent.trim(), 'В значке 2 + 2').toBe('4');
    expect(digits('#cart-total'), '2 × 3490 + 2 × 5990').toBe(18960);
  });

  it('в хранилище только id и qty', () => {
    for (const item of stored()) {
      expect(Object.keys(item).sort(), 'Позиция хранит только id и qty').toEqual(['id', 'qty']);
    }
  });

  it('loadCart отбрасывает мусор и сохраняет порядок', () => {
    localStorage.setItem('cart', JSON.stringify([{ id: 2, qty: 1 }, { id: 1, qty: '3' }, null, { id: 4, qty: 0 }, 'x', { id: 3, qty: 2 }]));
    expect(loadCart(), 'Остались позиции 2 и 3').toEqual([{ id: 2, qty: 1 }, { id: 3, qty: 2 }]);
    localStorage.setItem('cart', '{"id":1,"qty":1}');
    expect(loadCart(), 'Объект вместо массива').toEqual([]);
    localStorage.setItem('cart', 'null');
    expect(loadCart(), 'null').toEqual([]);
    saveCart([{ id: 1, qty: 2 }, { id: 2, qty: 2 }]);
  });

  it('saveCart записывает JSON-строку', () => {
    saveCart([{ id: 4, qty: 1 }]);
    expect(localStorage.getItem('cart'), 'JSON-строка в ключе cart').toBe('[{"id":4,"qty":1}]');
    saveCart([{ id: 1, qty: 2 }, { id: 2, qty: 2 }]);
  });

  it('удаление последних позиций показывает подсказку и пишет пустой массив', async () => {
    await click('#cart-items li[data-id="1"] .remove');
    await click('#cart-items li[data-id="2"] .remove');
    expect(rows(), 'Строк нет').toHaveLength(0);
    expect($('#cart-empty').hidden, 'Подсказка «Корзина пуста» видна').toBe(false);
    expect($('#cart-count').textContent.trim(), 'Значок показывает 0').toBe('0');
    expect(digits('#cart-total'), 'Итого 0').toBe(0);
    expect(localStorage.getItem('cart'), 'В хранилище пустой массив').toBe('[]');
  });

  it('после очистки можно собрать корзину заново', async () => {
    await click('#products li:nth-child(4) .add');
    expect(rows(), 'Одна строка').toHaveLength(1);
    expect(digits('#cart-total'), 'Кофемашина 12990').toBe(12990);
    expect($('#cart-empty').hidden, 'Подсказка снова скрыта').toBe(true);
  });

  it('на странице не было необработанных ошибок', () => {
    expect(window.__pageErrors, 'Ошибки скрипта страницы').toEqual([]);
  });
});
