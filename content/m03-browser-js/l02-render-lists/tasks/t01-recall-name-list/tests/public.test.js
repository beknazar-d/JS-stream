const items = () => $$('#cart-list li');

describe('Список названий', () => {
  it('по одному li на название, в том же порядке', () => {
    expect(items(), 'Количество элементов li').toHaveLength(3);
    expect(items().map((li) => li.textContent), 'Тексты элементов').toEqual(['Чайник K-200', 'Блендер B-50', 'Тостер T-2']);
  });

  it('у элементов есть класс cart-item', () => {
    expect(items().every((li) => li.classList.contains('cart-item')), 'Класс cart-item у каждого li').toBe(true);
  });

  it('счётчик показывает число позиций', () => {
    expect($('#cart-count').textContent.trim(), 'Текст счётчика').toBe('Позиций: 3');
  });
});
