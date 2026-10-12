import { cards, settle } from './helpers.js';

describe('Загрузка', () => {
  it('во время запроса статус «Загрузка» и aria-busy=true', async () => {
    await settle();
    shopServer.delayMs = 250;
    try {
      await click('#reload');
      expect($('#status').textContent, 'Статус, пока запрос идёт').toContain('Загрузка');
      expect($('#grid').getAttribute('aria-busy'), 'aria-busy у списка во время запроса').toBe('true');
      await settle();
    } finally {
      shopServer.delayMs = 80;
    }
    expect($('#status').textContent, 'После ответа статус очищается').toBe('');
    expect($('#grid').getAttribute('aria-busy'), 'После ответа aria-busy равен false').toBe('false');
    expect(cards(), 'После загрузки шесть карточек').toHaveLength(6);
  });
});

describe('Пустой результат', () => {
  it('нет товаров: «Ничего не найдено»', async () => {
    await settle();
    shopServer.catalog = [];
    try {
      await click('#reload');
      await settle();
      expect($('#status').textContent, 'Статус при пустом ответе').toBe('Ничего не найдено');
      expect(cards(), 'Карточек нет').toHaveLength(0);
      expect($('#total').textContent.trim(), 'Строка с общим числом').toBe('Найдено: 0');
    } finally {
      shopServer.catalog = null;
    }
  });
});

describe('Ошибка и повтор', () => {
  it('ответ 503: сообщение, пустой список, кнопка «Повторить»', async () => {
    await click('#reload');
    await settle();
    shopServer.failNext = 1;
    await click('#reload');
    await settle();
    expect($('#status').textContent, 'Статус при ошибке сервера').toBe('Не удалось загрузить каталог');
    expect(cards(), 'Список очищен при ошибке').toHaveLength(0);
    expect($('#total').textContent.trim(), 'Строка с общим числом очищена').toBe('');
    expect($('#retry').hidden, 'Кнопка «Повторить» видна').toBe(false);
  });

  it('повтор грузит каталог и убирает ошибку', async () => {
    const before = shopServer.calls.length;
    await click('#retry');
    await settle();
    expect(shopServer.calls.length - before, 'Повтор — один новый запрос').toBe(1);
    expect(cards(), 'После повтора шесть карточек').toHaveLength(6);
    expect($('#status').textContent, 'Статус после успешного повтора').toBe('');
    expect($('#retry').hidden, 'Кнопка «Повторить» скрыта после успеха').toBe(true);
  });
});
