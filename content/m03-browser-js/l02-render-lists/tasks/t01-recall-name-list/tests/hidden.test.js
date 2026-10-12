describe('Граничные случаи', () => {
  it('повторный вызов заменяет список', () => {
    renderNames(['Фен F-9']);
    expect($$('#cart-list li'), 'После второго вызова один элемент').toHaveLength(1);
    expect($('#cart-count').textContent.trim(), 'Счётчик после второго вызова').toBe('Позиций: 1');
  });

  it('пустой массив: пустой список и ноль позиций', () => {
    renderNames([]);
    expect($$('#cart-list li'), 'Нет элементов').toHaveLength(0);
    expect($('#cart-count').textContent.trim(), 'Счётчик').toBe('Позиций: 0');
  });

  it('теги в названии остаются текстом', () => {
    renderNames(['Миксер <b>PRO</b>']);
    const li = $('#cart-list li');
    expect(li.textContent, 'Текст с тегами показан как есть').toBe('Миксер <b>PRO</b>');
    expect(li.querySelector('b'), 'Элемент b не создаётся').toBeNull();
  });

  it('элементы лежат прямо в списке', () => {
    renderNames(['Весы', 'Чайник']);
    expect($('#cart-list').children.length, 'Прямых детей у списка').toBe(2);
  });
});
