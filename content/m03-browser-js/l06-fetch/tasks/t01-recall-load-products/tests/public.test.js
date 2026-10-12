// Короткое ожидание: если код неверен, тесты должны падать быстро, а не по общему таймауту.
const until = (condition) => waitFor(condition, 700);

const items = () => $$('#products li').map((li) => li.textContent.trim());

describe('Список товаров из API', () => {
  it('при загрузке выполнен один запрос GET /api/products', async () => {
    await until(() => items().length > 0);
    const calls = api().calls.filter((c) => c.path === '/api/products');
    expect(calls, 'Число запросов к /api/products при загрузке').toHaveLength(1);
    expect(calls[0].method, 'Метод запроса').toBe('GET');
  });

  it('каждый товар выведен строкой «название — цена ₽»', async () => {
    await until(() => items().length === 3);
    expect(items(), 'Строки списка').toEqual(['Чайник K-200 — 3490 ₽', 'Блендер B-50 — 4990 ₽', 'Тостер T-2 — 2190 ₽']);
  });
});
