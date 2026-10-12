const until = (condition) => waitFor(condition, 1000);
const status = () => $('#status').textContent.trim();
const rows = () => $$('#deliveries li').map((li) => li.textContent.trim());
const calls = () => api().calls.filter((c) => c.path === '/api/deliveries');

describe('Панель доставок', () => {
  it('при открытии один запрос; пока он идёт — статус и скрытая кнопка', () => {
    expect(calls(), 'Запросов при открытии').toHaveLength(1);
    expect(calls()[0].method, 'Метод').toBe('GET');
    expect(status(), 'Во время загрузки в статусе есть текст').not.toBe('');
    expect($('#retry').hidden, 'Кнопка «Повторить» скрыта').toBe(true);
  });

  it('сервер молчит: через 800 мс состояние ошибки', async () => {
    await until(() => !$('#retry').hidden);
    expect(status(), 'В статусе текст ошибки').not.toBe('');
    expect(rows(), 'Список пуст').toHaveLength(0);
  });

  it('«Повторить» запускает ровно один запрос; 503 — снова состояние ошибки', async () => {
    await click('#retry');
    expect($('#retry').hidden, 'Пока идёт повтор, кнопка скрыта').toBe(true);
    expect(status(), 'Пока идёт повтор, в статусе есть текст').not.toBe('');
    await until(() => !$('#retry').hidden);
    expect(calls(), 'Всего два запроса').toHaveLength(2);
    expect(status(), 'В статусе текст ошибки').not.toBe('');
  });

  it('второй повтор успешен: три доставки, статус пуст', async () => {
    await click('#retry');
    await until(() => rows().length === 3);
    expect(calls(), 'Всего три запроса').toHaveLength(3);
    expect(rows().join(' | '), 'В строках видны города').toMatch(/Казань[\s\S]*Самара[\s\S]*Пермь/);
    expect(status(), 'После успеха статус пуст').toBe('');
    expect($('#retry').hidden, 'Кнопка скрыта').toBe(true);
  });
});
