const text = (sel) => $(sel).textContent.replace(/\s/g, ' ').trim();

describe('Страница товара при загрузке', () => {
  it('тексты и заголовок страницы', () => {
    expect(text('.p-title'), 'Заголовок h1').toBe('Чайник K-200');
    expect(text('.crumb-current'), 'Хлебная крошка').toBe('Чайник K-200');
    expect(document.title, 'Заголовок вкладки').toBe('Чайник K-200 — Домотека');
  });

  it('цена, старая цена и скидка', () => {
    expect(text('.p-price'), 'Цена').toBe('2 990 ₽');
    expect($('.p-old-price').hidden, 'Старая цена показана').toBe(false);
    expect(text('.p-old-price'), 'Старая цена').toBe('3 990 ₽');
    expect($('.p-discount').hidden, 'Бейдж скидки показан').toBe(false);
    expect(text('.p-discount'), 'Скидка (3990 → 2990 = 25%)').toBe('Скидка 25%');
  });

  it('наличие и кнопка', () => {
    expect(text('.p-stock'), 'Подпись наличия').toBe('В наличии');
    expect($('.p-stock').classList.contains('p-stock--ok'), 'Класс p-stock--ok').toBe(true);
    expect($('.p-buy').disabled, 'Кнопка включена').toBe(false);
    expect($('.p-buy').dataset.productId, 'data-product-id').toBe('k200');
  });

  it('картинка с описанием', () => {
    expect($('.p-photo').getAttribute('src'), 'src картинки').toBe('img/k200.jpg');
    expect($('.p-photo').alt, 'alt картинки').toBe('Чайник K-200, вид спереди');
  });
});
