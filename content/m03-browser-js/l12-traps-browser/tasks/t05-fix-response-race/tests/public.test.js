const titles = () => $$('#products li').map((li) => li.textContent);
const cleaning = ['Пылесос Domo V-300', 'Паровая швабра Vento M-9'];

describe('Смена вкладки', () => {
  it('последняя нажатая вкладка выигрывает у медленного ответа', async () => {
    await click('[data-category="kitchen"]');
    await wait(100);
    await click('[data-category="cleaning"]');
    await wait(900);
    expect(titles(), 'Через 900 мс после нажатия «Уборка» в списке товары «Уборки», а не медленной «Кухни»').toEqual(cleaning);
    expect($('#status').textContent, 'После загрузки статус пуст').toBe('');
    expect($('[data-category="cleaning"]').getAttribute('aria-pressed'), 'Подсвечена последняя вкладка').toBe('true');
  });

  it('пока грузится последняя вкладка, в статусе «Загрузка»', async () => {
    await click('[data-category="kitchen"]');
    await wait(100);
    expect($('#status').textContent, 'Кухня отвечает около 500 мс').toContain('Загрузка');
    await waitFor(() => titles().length === 2 && titles()[0].includes('чайник'), 1000);
  });
});
