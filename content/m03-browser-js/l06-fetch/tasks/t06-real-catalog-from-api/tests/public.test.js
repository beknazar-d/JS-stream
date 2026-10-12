const until = (condition) => waitFor(condition, 700);
const titles = () => $$('#products li.product h3').map((h) => h.textContent.trim());

describe('Каталог из API', () => {
  it('при загрузке выполнен запрос GET /api/products', async () => {
    await until(() => titles().length > 0);
    const calls = api().calls.filter((c) => c.path === '/api/products');
    expect(calls.length, 'Хотя бы один запрос к /api/products').toBeGreaterThanOrEqual(1);
    expect(calls[0].method, 'Метод запроса').toBe('GET');
  });

  it('пять карточек с названиями', async () => {
    await until(() => titles().length === 5);
    expect(titles(), 'Названия в порядке ответа').toEqual(['Чайник K-200', 'Блендер B-50', 'Тостер T-2', 'Пылесос V-700', 'Мультиварка M-5']);
  });

  it('в карточке видна цена', async () => {
    await until(() => titles().length === 5);
    const card = (n) => $$('#products li.product')[n].textContent;
    expect(card(0), 'Цена чайника').toMatch(/3\s?490/);
    expect(card(3), 'Цена пылесоса').toMatch(/12\s?990/);
  });

  it('переключатель «Только в наличии» оставляет только товары в наличии', async () => {
    await until(() => titles().length === 5);
    const box = $('#only-in-stock');
    box.checked = true;
    box.dispatchEvent(new Event('change', { bubbles: true }));
    await wait(30);
    expect(titles(), 'Только в наличии').toEqual(['Чайник K-200', 'Тостер T-2', 'Пылесос V-700']);
    box.checked = false;
    box.dispatchEvent(new Event('change', { bubbles: true }));
    await wait(30);
    expect(titles(), 'Фильтр снят: снова все').toHaveLength(5);
  });
});
