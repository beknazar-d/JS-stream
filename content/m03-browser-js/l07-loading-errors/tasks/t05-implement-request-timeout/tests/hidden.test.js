const until = (condition) => waitFor(condition, 900);
const status = () => $('#status').textContent.trim();
const rows = () => $$('#slots li').map((li) => li.textContent.trim());

async function withFetch(stub, action) {
  await wait(100); // дожидаемся ответов на запросы из прошлых тестов
  const original = window.fetch;
  window.fetch = stub;
  try {
    await action();
  } finally {
    window.fetch = original;
  }
}

describe('Таймаут запроса: отмена и сброс таймера', () => {
  it('запрос реально отменяется через signal', async () => {
    let signal;
    await withFetch(
      (url, init = {}) =>
        new Promise((resolve, reject) => {
          signal = init.signal;
          if (signal) signal.addEventListener('abort', () => reject(new DOMException('The operation was aborted.', 'AbortError')));
        }),
      async () => {
        await click('#reload');
        expect(signal, 'В fetch передан signal').toBeDefined();
        expect(signal.aborted, 'Сразу после старта запрос не отменён').toBe(false);
        await wait(650);
        expect(signal.aborted, 'Через 650 мс запрос отменён').toBe(true);
        expect(status(), 'Сообщение о таймауте').toBe('Сервер отвечает слишком долго');
        expect($('#retry').hidden, 'Кнопка показана').toBe(false);
      },
    );
  });

  it('быстрый ответ: ложного сообщения о таймауте потом нет', async () => {
    const data = JSON.stringify([{ id: 1, label: 'Чт, 9:00–12:00' }]);
    await withFetch(async () => new Response(data, { status: 200 }), async () => {
      await click('#reload');
      await until(() => rows().length === 1);
      await wait(700);
      expect(status(), 'Статус остался пустым').toBe('');
      expect($('#retry').hidden, 'Кнопка осталась скрытой').toBe(true);
      expect(rows(), 'Список на месте').toEqual(['Чт, 9:00–12:00']);
    });
  });

  it('нет сети: «Нет соединения с сервером»', async () => {
    await withFetch(
      async () => {
        throw new TypeError('Failed to fetch');
      },
      async () => {
        await click('#reload');
        await until(() => !$('#retry').hidden);
        expect(status(), 'Сообщение о сети').toBe('Нет соединения с сервером');
      },
    );
  });

  it('ответ 503: сообщение со статусом', async () => {
    await withFetch(async () => new Response('', { status: 503 }), async () => {
      await click('#reload');
      await until(() => !$('#retry').hidden);
      expect(status(), 'Сообщение со статусом').toBe('Не удалось загрузить окна доставки (503)');
    });
  });
});
