const titles = () => $$('#results li').map((li) => li.textContent);
const queries = (from) => api().calls.slice(from).map((c) => c.query.q);

describe('Поиск при вводе', () => {
  it('на ввод «ч», «чай», «чайник» уходит один запрос, список заполняется', async () => {
    const before = api().calls.length;
    for (const text of ['ч', 'чай', 'чайник']) {
      await type('#search', text);
      await wait(60);
    }
    await wait(520);
    expect(queries(before), 'Запросы после ввода с паузами по 60 мс').toEqual(['чайник']);
    const items = titles();
    expect(items, 'В списке два товара').toHaveLength(2);
    expect(items[0], 'Первый товар в списке').toContain('Электрический чайник Domo K-17');
    expect(items[1], 'Второй товар в списке').toContain('Чайник стеклянный Vento');
  });

  it('если товаров нет, показан текст «Ничего не найдено»', async () => {
    await type('#search', 'тостер');
    await waitFor(() => $('#status').textContent === 'Ничего не найдено', 1200);
    expect($$('#results li'), 'Список пуст').toHaveLength(0);
  });

  it('пока идёт загрузка, в статусе есть слово «Загрузка»', async () => {
    await type('#search', 'чай');
    await wait(360);
    expect($('#status').textContent, 'Запрос «чай» идёт около 600 мс, статус во время ожидания').toContain('Загрузка');
    await waitFor(() => titles().length === 3, 1000);
    expect($('#status').textContent, 'После ответа статус очищен').toBe('');
  });
});
