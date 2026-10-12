const until = (condition) => waitFor(condition, 900);
const status = () => $('#status').textContent.trim();
const rows = () => $$('#orders li').map((li) => li.textContent.trim());

describe('Состояния списка заказов', () => {
  it('пока идёт запрос: «Загрузка…», кнопка скрыта', () => {
    expect(status(), 'Статус во время загрузки').toBe('Загрузка…');
    expect($('#retry').hidden, 'Кнопка «Повторить» скрыта').toBe(true);
  });

  it('сервер ответил 503: сообщение и кнопка «Повторить»', async () => {
    await until(() => status().includes('503'));
    expect(status(), 'Сообщение об ошибке').toBe('Не удалось загрузить заказы (503)');
    expect($('#retry').hidden, 'Кнопка «Повторить» показана').toBe(false);
  });

  it('«Повторить» загружает заказы', async () => {
    await click('#retry');
    expect(status(), 'Сразу после нажатия снова идёт загрузка').toBe('Загрузка…');
    expect($('#retry').hidden, 'Во время загрузки кнопка скрыта').toBe(true);
    await until(() => rows().length === 3);
    expect(rows(), 'Заказы').toEqual(['Заказ №1042 — 12990 ₽', 'Заказ №1043 — 3490 ₽', 'Заказ №1044 — 2190 ₽']);
    expect(status(), 'После успеха статус пуст').toBe('');
  });
});
