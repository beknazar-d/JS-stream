const until = (condition) => waitFor(condition, 700);
const stock = (n) => $('.card:nth-child(' + n + ') .stock').textContent.trim();
const stockCalls = () => api().calls.filter((c) => c.path === '/api/stock');

describe('Проверка наличия', () => {
  it('товар в наличии: число штук', async () => {
    await click('.card:nth-child(1) .check');
    await until(() => stock(1) !== '');
    expect(stock(1), 'Чайник, остаток 3').toBe('В наличии: 3 шт.');
  });

  it('запрос идёт с артикулом нажатой карточки', async () => {
    const before = stockCalls().length;
    await click('.card:nth-child(2) .check');
    await until(() => stock(2) !== '');
    const calls = stockCalls().slice(before);
    expect(calls, 'Один клик — один запрос').toHaveLength(1);
    expect(calls[0].method, 'Метод').toBe('GET');
    expect(calls[0].query.sku, 'Артикул второй карточки').toBe('B-50');
  });

  it('остаток 0: «Нет в наличии»', async () => {
    await click('.card:nth-child(2) .check');
    await until(() => stock(2) !== '');
    expect(stock(2), 'Блендер, остаток 0').toBe('Нет в наличии');
  });

  it('неизвестный артикул: «Артикул не найден»', async () => {
    await click('.card:nth-child(3) .check');
    await until(() => stock(3) !== '');
    expect(stock(3), 'Тостер, ответ 404').toBe('Артикул не найден');
  });
});
