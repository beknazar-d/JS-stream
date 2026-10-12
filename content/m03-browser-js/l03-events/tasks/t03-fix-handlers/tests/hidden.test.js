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

describe('Граничные случаи', () => {
  it('другие клавиши статус не меняют', async () => {
    $('#q').value = 'тостер';
    await press('#q', 'Enter');
    $('#q').value = 'фен';
    await press('#q', 'a');
    await press('#q', 'Escape');
    expect($('#status').textContent.trim(), 'Статус остался от последнего Enter').toBe('Ищем: тостер');
  });

  it('пустой запрос по Enter', async () => {
    $('#q').value = '   ';
    await press('#q', 'Enter');
    expect($('#status').textContent.trim(), 'Пустой запрос после обрезки пробелов').toBe('Ищем:');
  });

  it('второй клик по ссылке тоже не переходит', () => {
    expect(clickLink('#details'), 'Каждый клик отменяет переход').toBe(true);
  });

  it('счётчик растёт ровно на 1 за клик', async () => {
    const before = Number($('#count').textContent.replace(/\D/g, ''));
    await click('#add');
    await click('#add');
    await click('#add');
    expect(Number($('#count').textContent.replace(/\D/g, '')) - before, 'Три клика — три единицы').toBe(3);
  });
});
