const until = (condition) => waitFor(condition, 1200);
const status = () => $('#status').textContent.trim();
const rows = () => $$('#slots li').map((li) => li.textContent.trim());

describe('Таймаут запроса', () => {
  it('пока запрос идёт: «Загружаем окна доставки…», кнопка скрыта', () => {
    expect(status(), 'Статус во время загрузки').toBe('Загружаем окна доставки…');
    expect($('#retry').hidden, 'Кнопка скрыта').toBe(true);
  });

  it('сервер молчит: через полсекунды сообщение о таймауте и кнопка', async () => {
    await until(() => !$('#retry').hidden);
    expect(status(), 'Сообщение о таймауте').toBe('Сервер отвечает слишком долго');
  });

  it('«Повторить»: окна доставки выведены', async () => {
    await click('#retry');
    await until(() => rows().length === 3);
    expect(rows(), 'Окна доставки').toEqual(['Вт, 9:00–12:00', 'Вт, 12:00–15:00', 'Ср, 9:00–12:00']);
    expect(status(), 'Статус пуст').toBe('');
    expect($('#retry').hidden, 'Кнопка скрыта').toBe(true);
  });
});
