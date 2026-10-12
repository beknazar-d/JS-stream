const text = (sel) => $(sel).textContent.replace(/\s/g, ' ').trim();

describe('Повторный вызов с другим товаром', () => {
  it('товар без скидки и без остатка', () => {
    renderProduct({ id: 't2', title: 'Тостер T-2', price: 2190, stock: 0, image: 'img/t2.jpg' });
    expect(text('.p-title'), 'Новый заголовок').toBe('Тостер T-2');
    expect(document.title, 'Новый заголовок вкладки').toBe('Тостер T-2 — Домотека');
    expect($('.p-old-price').hidden, 'Старая цена скрыта').toBe(true);
    expect(text('.p-old-price'), 'Старая цена пуста').toBe('');
    expect($('.p-discount').hidden, 'Скидка скрыта').toBe(true);
    expect(text('.p-discount'), 'Скидка пуста').toBe('');
    expect(text('.p-stock'), 'Подпись наличия').toBe('Нет в наличии');
    expect($('.p-buy').disabled, 'Кнопка отключена').toBe(true);
  });

  it('классы наличия не накапливаются', () => {
    const stock = $('.p-stock');
    expect(stock.classList.contains('p-stock--out'), 'Есть p-stock--out').toBe(true);
    expect(stock.classList.contains('p-stock--ok'), 'Нет p-stock--ok от прошлого вызова').toBe(false);
    renderProduct({ id: 'b50', title: 'Блендер B-50', price: 4990, stock: 3, image: 'img/b50.jpg' });
    expect(stock.classList.contains('p-stock--out'), 'Класс p-stock--out снят').toBe(false);
    expect(stock.classList.contains('p-stock--ok'), 'Есть p-stock--ok').toBe(true);
    expect($('.p-buy').disabled, 'Кнопка снова включена').toBe(false);
    expect($('.p-buy').dataset.productId, 'data-product-id новый').toBe('b50');
  });

  it('процент скидки округляется до целого', () => {
    renderProduct({ id: 'f9', title: 'Фен F-9', price: 1500, oldPrice: 2490, stock: 1, image: 'img/f9.jpg' });
    expect(text('.p-discount'), '(2490 - 1500) / 2490 = 39,76% → 40').toBe('Скидка 40%');
    expect(text('.p-old-price'), 'Старая цена').toBe('2 490 ₽');
  });

  it('старая цена не больше текущей — скидки нет', () => {
    renderProduct({ id: 'x', title: 'Весы', price: 990, oldPrice: 990, stock: 5, image: 'img/x.jpg' });
    expect($('.p-old-price').hidden, 'Старая цена равна текущей — скрыта').toBe(true);
    expect($('.p-discount').hidden, 'Скидка скрыта').toBe(true);
  });

  it('alt по умолчанию равен названию', () => {
    renderProduct({ id: 'x', title: 'Весы кухонные', price: 990, stock: 5, image: 'img/x.jpg' });
    expect($('.p-photo').alt, 'alt без imageAlt').toBe('Весы кухонные');
    renderProduct({ id: 'y', title: 'Весы напольные', price: 990, stock: 5, image: 'img/y.jpg', imageAlt: 'Напольные весы, вид сверху' });
    expect($('.p-photo').alt, 'alt с imageAlt').toBe('Напольные весы, вид сверху');
  });

  it('кнопка и картинка доступны для программ чтения с экрана', () => {
    renderProduct({ id: 'k200', title: 'Чайник K-200', price: 2990, stock: 2, image: 'img/k200.jpg' });
    expect(labelOf('.p-buy'), 'Доступное имя кнопки').toBe('Добавить в корзину: Чайник K-200');
    expect(labelOf('.p-photo'), 'Доступное имя картинки').toBe('Чайник K-200');
  });
});
