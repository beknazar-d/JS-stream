// Сообщает, отменил ли обработчик страницы действие по умолчанию.
// Само действие мы блокируем после проверки, чтобы тест не уходил со страницы.
function probe(type, run) {
  let prevented = null;
  const guard = (event) => {
    prevented = event.defaultPrevented;
    event.preventDefault();
  };
  document.addEventListener(type, guard);
  run();
  document.removeEventListener(type, guard);
  return prevented;
}

const visible = () => $$('#results li').filter((li) => !li.hidden).map((li) => li.textContent.trim());

describe('Краевые случаи запроса', () => {
  it('пробелы по краям запроса игнорируются', async () => {
    await type('#q', '  b-50  ');
    expect(visible(), 'Запрос с пробелами').toEqual(['Блендер B-50']);
  });

  it('запрос только из пробелов не скрывает ничего', async () => {
    await type('#q', '    ');
    expect(visible(), 'Видимые товары').toHaveLength(8);
    expect($('.empty').hidden, 'Сообщение скрыто').toBe(true);
  });

  it('скобки ищутся как обычные символы', async () => {
    await type('#q', '(');
    expect(visible(), 'Запрос «(»').toEqual(['Миксер M-7 (мини)']);
    await type('#q', '[серые]');
    expect(visible(), 'Запрос «[серые]»').toEqual(['Весы кухонные V-1 [серые]']);
    await type('#q', '(мини');
    expect(visible(), 'Запрос «(мини»').toEqual(['Миксер M-7 (мини)']);
  });

  it('повторные запросы не накапливают скрытие', async () => {
    await type('#q', 'тостер');
    await type('#q', 'фен');
    expect(visible(), 'Только фен').toEqual(['Фен F-9']);
  });
});

describe('Форма и ссылка', () => {
  it('отправка формы отменяет перезагрузку', async () => {
    await type('#q', 'чай');
    const prevented = probe('submit', () => $('#search-form').requestSubmit());
    expect(prevented, 'На submit нужен preventDefault').toBe(true);
    expect(visible(), 'Список не изменился при отправке').toEqual(['Чайник K-200', 'Чайник стеклянный G-10']);
  });

  it('кнопка «Найти» не ломает страницу', async () => {
    await type('#q', 'фен');
    probe('submit', () => $('#search-form').requestSubmit($('#search-form button')));
    await wait(0);
    expect(visible(), 'После отправки формы результат тот же').toEqual(['Фен F-9']);
  });

  it('ссылка «Сбросить» очищает поиск и не переходит по адресу', async () => {
    await type('#q', 'чай');
    const prevented = probe('click', () => $('#reset').dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })));
    expect(prevented, 'Переход по ссылке отменён').toBe(true);
    expect($('#q').value, 'Поле очищено').toBe('');
    expect(visible(), 'Все товары видны').toHaveLength(8);
    expect($('#status').textContent.trim(), 'Статус').toBe('Найдено: 8');
  });

  it('другие клавиши поле не очищают', async () => {
    await type('#q', 'тост');
    await press('#q', 'a');
    await press('#q', 'Enter');
    expect($('#q').value, 'Текст в поле остался').toBe('тост');
  });
});
