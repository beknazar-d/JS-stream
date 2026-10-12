describe('Повторные вызовы и краевые случаи', () => {
  it('повторный вызов заменяет карточки', () => {
    renderCatalog([{ id: 'f9', title: 'Фен F-9', price: 1500, stock: 2 }]);
    expect($$('.catalog .card'), 'Одна карточка после второго вызова').toHaveLength(1);
    expect($('.catalog .card').dataset.id, 'Это новая карточка').toBe('f9');
  });

  it('пустой массив: список пуст, сообщение показано', () => {
    renderCatalog([]);
    expect($$('.catalog .card'), 'Карточек нет').toHaveLength(0);
    expect($('.empty').hidden, 'Сообщение показано').toBe(false);
  });

  it('после пустого результата и непустого сообщение снова скрыто', () => {
    renderCatalog([{ id: 'x', title: 'Весы', price: 990, stock: 1 }]);
    expect($('.empty').hidden, 'Сообщение скрыто после непустого вызова').toBe(true);
  });

  it('разметка в названии остаётся текстом', () => {
    renderCatalog([{ id: 'p', title: 'Тостер <b>T-2</b>', price: 2190, stock: 3 }]);
    const title = $('.catalog .card__title');
    expect(title.textContent, 'Название как есть').toBe('Тостер <b>T-2</b>');
    expect(title.querySelector('b'), 'Элемента b нет').toBeNull();
  });

  it('шаблон не изменён', () => {
    const tpl = $('#card-template').content;
    expect(tpl.querySelector('.card__title').textContent, 'Заголовок в шаблоне пуст').toBe('');
    expect(tpl.querySelector('.card').dataset.id, 'В шаблоне нет data-id').toBeUndefined();
    expect(tpl.children.length, 'В шаблоне по-прежнему одна карточка').toBe(1);
  });

  it('состояние карточек не наследуется от прошлого вызова', () => {
    renderCatalog([{ id: 'a', title: 'А', price: 1, stock: 0 }]);
    renderCatalog([{ id: 'b', title: 'Б', price: 1, stock: 5 }]);
    const card = $('.catalog .card');
    expect(card.classList.contains('card--out'), 'Класс card--out не остался').toBe(false);
    expect(card.querySelector('.card__buy').disabled, 'Кнопка включена').toBe(false);
  });
});
