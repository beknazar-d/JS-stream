describe('Момент запроса', () => {
  it('сразу после ввода запроса ещё нет, через 300 мс он уходит', async () => {
    const before = api().calls.length;
    await type('#search', 'утюг');
    await wait(150);
    expect(api().calls.length - before, 'Через 150 мс после ввода запрос ещё не должен уйти').toBe(0);
    await wait(300);
    expect(api().calls.length - before, 'Через 450 мс после ввода запрос должен был уйти').toBe(1);
  });

  it('два отдельных поиска дают два запроса, на экране второй результат', async () => {
    const before = api().calls.length;
    await type('#search', 'чайник');
    await wait(450);
    await type('#search', 'утюг');
    await wait(450);
    const calls = api().calls.slice(before);
    expect(calls.map((c) => c.query.q), 'Запросы двух поисков с паузой между ними').toEqual(['чайник', 'утюг']);
    expect($$('#results li').map((li) => li.textContent), 'На экране результат последнего поиска').toEqual(['Утюг Domo S-5']);
  });
});
