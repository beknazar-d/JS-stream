const titles = () => $$('#products li').map((li) => li.textContent);

describe('Устаревшие ответы и ошибки', () => {
  it('ошибка устаревшей вкладки не показывается', async () => {
    await click('[data-category="climate"]');
    await wait(100);
    await click('[data-category="cleaning"]');
    await wait(700);
    expect(titles(), 'В списке товары «Уборки»').toHaveLength(2);
    expect(titles()[0], 'Первый товар «Уборки»').toContain('Пылесос');
    expect($('#status').textContent, 'Ошибка отменённого запроса «Климат» не должна появляться').toBe('');
  });

  it('быстрая вкладка, затем медленная: на экране медленная, статус пуст', async () => {
    await click('[data-category="cleaning"]');
    await wait(100);
    await click('[data-category="kitchen"]');
    await wait(900);
    expect(titles()[0], 'Последняя нажатая вкладка — «Кухня»').toContain('чайник');
    expect($('#status').textContent, 'Статус после загрузки').toBe('');
    expect($('[data-category="kitchen"]').getAttribute('aria-pressed'), 'Подсвечена «Кухня»').toBe('true');
  });

  it('если последняя вкладка сама упала, показана ошибка', async () => {
    await click('[data-category="climate"]');
    await waitFor(() => $('#status').textContent.includes('Не удалось'), 1000);
    expect($('#status').textContent, 'Ошибка последнего запроса').toBe('Не удалось загрузить');
    expect($$('#products li'), 'Список пуст после ошибки').toHaveLength(0);
  });
});
