// Нажимает на ссылку и сообщает, отменил ли переход обработчик страницы.
// Сам переход мы блокируем после проверки, чтобы тест не уходил со страницы.
function clickLink(selector) {
  let prevented = null;
  const guard = (event) => {
    prevented = event.defaultPrevented;
    event.preventDefault();
  };
  document.addEventListener('click', guard);
  $(selector).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  document.removeEventListener('click', guard);
  return prevented;
}

describe('Счётчик', () => {
  it('до первого клика счётчик нулевой', () => {
    expect($('#count').textContent.trim(), 'Текст счётчика сразу после загрузки').toBe('Корзина: 0');
  });

  it('клик увеличивает счёт на 1', async () => {
    await click('#add');
    expect($('#count').textContent.trim(), 'После одного клика').toBe('Корзина: 1');
    await click('#add');
    expect($('#count').textContent.trim(), 'После двух кликов').toBe('Корзина: 2');
  });
});

describe('Ссылка «Характеристики»', () => {
  it('переход отменён', () => {
    expect(clickLink('#details'), 'Обработчик должен вызвать event.preventDefault()').toBe(true);
  });

  it('блок с характеристиками показан', () => {
    expect($('#specs-note').hidden, 'Блок #specs-note больше не скрыт').toBe(false);
  });
});

describe('Поиск по Enter', () => {
  it('Enter записывает запрос в статус', async () => {
    $('#q').value = '  чайник ';
    await press('#q', 'Enter');
    expect($('#status').textContent.trim(), 'Статус после Enter').toBe('Ищем: чайник');
  });
});
