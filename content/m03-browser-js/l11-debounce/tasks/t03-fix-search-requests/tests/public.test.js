async function typeSlowly(letters) {
  for (const text of letters) {
    await type('#search', text);
    await wait(50);
  }
}

describe('Поиск при вводе', () => {
  it('на три буквы с короткими паузами уходит один запрос', async () => {
    const before = api().calls.length;
    await typeSlowly(['ч', 'чай', 'чайник']);
    await wait(550);
    const calls = api().calls.slice(before);
    expect(calls, 'Запросы после ввода «ч», «чай», «чайник» с паузами по 50 мс').toHaveLength(1);
    expect(calls[0].query.q, 'В запросе должен быть целый текст «чайник»').toBe('чайник');
  });

  it('результаты выводятся списком', async () => {
    const items = await waitFor(() => $$('#results li').length === 2 && $$('#results li'), 800);
    expect(items.map((li) => li.textContent), 'Названия товаров в #results').toEqual(['Электрический чайник Domo K-17', 'Чайник стеклянный Vento']);
  });
});
