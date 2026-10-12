const until = (condition) => waitFor(condition, 900);
const status = () => $('#status').textContent.trim();
const rows = () => $$('#orders li').map((li) => li.textContent.trim());
const orderCalls = () => api().calls.filter((c) => c.path === '/api/orders');

describe('Кнопка «Повторить»', () => {
  it('при открытии идёт один запрос, пока он идёт — «Загрузка…»', () => {
    expect(orderCalls(), 'Запросов при открытии страницы').toHaveLength(1);
    expect(status(), 'Статус во время загрузки').toBe('Загрузка…');
    expect($('#retry').hidden, 'Кнопка скрыта во время загрузки').toBe(true);
  });

  it('после 503 показаны сообщение и кнопка', async () => {
    await until(() => status() === 'Не удалось загрузить заказы');
    expect($('#retry').hidden, 'Кнопка «Повторить» показана').toBe(false);
  });

  it('«Повторить» загружает заказы', async () => {
    await click('#retry');
    await until(() => rows().length === 3);
    expect(orderCalls(), 'Всего два запроса').toHaveLength(2);
    expect(rows()[0], 'Первый заказ').toBe('Заказ №1042 — 12990 ₽');
  });
});
