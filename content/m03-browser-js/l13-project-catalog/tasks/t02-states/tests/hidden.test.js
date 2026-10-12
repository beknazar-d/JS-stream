import { cards, settle } from './helpers.js';

describe('Нестабильная сеть', () => {
  it('падение сети (fetch отклонён) тоже даёт ошибку и «Повторить»', async () => {
    await settle();
    const original = window.fetch;
    window.fetch = () => Promise.reject(new TypeError('Failed to fetch'));
    try {
      await click('#reload');
      await wait(60);
      expect($('#status').textContent, 'Статус при падении сети').toBe('Не удалось загрузить каталог');
      expect($('#retry').hidden, 'Кнопка «Повторить» видна').toBe(false);
    } finally {
      window.fetch = original;
    }
    await click('#retry');
    await settle();
    expect(cards(), 'После возвращения сети повтор показывает каталог').toHaveLength(6);
  });

  it('две ошибки подряд: ошибка остаётся, третья попытка успешна', async () => {
    await settle();
    shopServer.failNext = 2;
    await click('#reload');
    await settle();
    await click('#retry');
    await settle();
    expect($('#status').textContent, 'Вторая подряд ошибка').toBe('Не удалось загрузить каталог');
    expect($('#retry').hidden, 'Кнопка остаётся видимой после второй ошибки').toBe(false);
    await click('#retry');
    await settle();
    expect($('#status').textContent, 'Третья попытка успешна').toBe('');
    expect(cards(), 'Каталог показан').toHaveLength(6);
  });

  it('во время повтора кнопка «Повторить» скрыта, а статус — «Загрузка»', async () => {
    await settle();
    shopServer.failNext = 1;
    await click('#reload');
    await settle();
    shopServer.delayMs = 250;
    try {
      await click('#retry');
      expect($('#retry').hidden, 'Пока идёт повтор, кнопка скрыта').toBe(true);
      expect($('#status').textContent, 'Пока идёт повтор, статус — загрузка').toContain('Загрузка');
      await settle();
    } finally {
      shopServer.delayMs = 80;
    }
  });

  it('после пустого результата обычный ответ снова показывает карточки', async () => {
    await settle();
    shopServer.catalog = [];
    await click('#reload');
    await settle();
    shopServer.catalog = null;
    await click('#reload');
    await settle();
    expect(cards(), 'Карточки вернулись').toHaveLength(6);
    expect($('#status').textContent, 'Сообщение «Ничего не найдено» убрано').toBe('');
    expect($('#total').textContent.trim(), 'Общее число').toBe('Найдено: 24');
  });
});
