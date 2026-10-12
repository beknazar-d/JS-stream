const rows = () => $$('#cart-items li');
const row = (id) => $(`#cart-items li[data-id="${id}"]`);
const qtyOf = (id) => Number(row(id).querySelector('.qty').textContent.trim());
const stored = () => JSON.parse(localStorage.getItem('cart'));
const digits = (selector) => Number($(selector).textContent.replace(/\D/g, ''));

describe('Восстановление корзины', () => {
  it('при загрузке показаны позиции из хранилища', () => {
    expect(rows(), 'Две позиции: чайник и тостер').toHaveLength(2);
    expect(qtyOf(1), 'Чайника 2').toBe(2);
    expect(qtyOf(3), 'Тостер 1').toBe(1);
    expect($('#cart-count').textContent.trim(), 'В значке 2 + 1 = 3 единицы').toBe('3');
    expect(digits('#cart-total'), 'Итого 2 × 3490 + 2190').toBe(9170);
    expect($('#cart-empty').hidden, 'Корзина не пуста, подсказка скрыта').toBe(true);
  });
});

describe('Изменение корзины', () => {
  it('добавление нового товара и повторное добавление', async () => {
    await click('#products li:nth-child(2) .add');
    expect(rows(), 'Появилась третья строка').toHaveLength(3);
    expect(qtyOf(2), 'Блендер добавлен один раз').toBe(1);
    expect(stored(), 'В хранилище новая позиция в конце').toEqual([{ id: 1, qty: 2 }, { id: 3, qty: 1 }, { id: 2, qty: 1 }]);
    await click('#products li:nth-child(2) .add');
    expect(rows(), 'Повторное добавление не создаёт новую строку').toHaveLength(3);
    expect(qtyOf(2), 'Блендеров два').toBe(2);
    expect($('#cart-count').textContent.trim(), 'В значке 2 + 1 + 2').toBe('5');
  });

  it('кнопка плюс увеличивает количество и обновляет итог', async () => {
    await click('#cart-items li[data-id="1"] .inc');
    expect(qtyOf(1), 'Чайников стало 3').toBe(3);
    expect(stored().find((item) => item.id === 1), 'Новое количество сохранено').toEqual({ id: 1, qty: 3 });
    expect(digits('#cart-total'), '3 × 3490 + 2190 + 2 × 5990').toBe(24640);
  });

  it('кнопка удаления убирает позицию', async () => {
    await click('#cart-items li[data-id="3"] .remove');
    expect(row(3), 'Строки тостера нет').toBeNull();
    expect(stored().map((item) => item.id), 'В хранилище осталось два товара').toEqual([1, 2]);
  });
});

describe('Панель корзины', () => {
  it('открытие и закрытие, состояние в sessionStorage', async () => {
    await click('#cart-toggle');
    expect($('#cart-panel').hidden, 'После первого клика панель открыта').toBe(false);
    expect($('#cart-toggle').getAttribute('aria-expanded'), 'aria-expanded отражает открытие').toBe('true');
    expect(sessionStorage.getItem('cart-open'), 'В sessionStorage 1').toBe('1');
    await click('#cart-toggle');
    expect($('#cart-panel').hidden, 'После второго клика панель закрыта').toBe(true);
    expect(sessionStorage.getItem('cart-open'), 'В sessionStorage 0').toBe('0');
  });
});

describe('loadCart: надёжность', () => {
  it('битый JSON и отсутствие ключа дают пустую корзину', () => {
    localStorage.setItem('cart', '{oops');
    expect(loadCart(), 'Обрезанный JSON').toEqual([]);
    localStorage.removeItem('cart');
    expect(loadCart(), 'Нет ключа').toEqual([]);
    saveCart([{ id: 1, qty: 3 }, { id: 2, qty: 2 }]);
  });
});
