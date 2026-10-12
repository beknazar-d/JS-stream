const until = (condition) => waitFor(condition, 800);
const status = () => $('#status').textContent.trim();
const rows = () => $$('#deliveries li').map((li) => li.textContent.trim());

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

describe('Панель доставок: граничные случаи', () => {
  it('#status — живая область', () => {
    const role = $('#status').getAttribute('role');
    const live = $('#status').getAttribute('aria-live');
    expect(role === 'status' || role === 'alert' || live === 'polite' || live === 'assertive', 'У #status есть role или aria-live').toBe(true);
  });

  it('запрос отменяется через signal примерно через 800 мс', async () => {
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
        await wait(500);
        expect(signal.aborted, 'Через 500 мс ещё ждём').toBe(false);
        await wait(450);
        expect(signal.aborted, 'Через 950 мс запрос отменён').toBe(true);
        expect($('#retry').hidden, 'Кнопка «Повторить» показана').toBe(false);
        expect(status(), 'Есть текст ошибки').not.toBe('');
      },
    );
  });

  it('нет сети: состояние ошибки с кнопкой', async () => {
    await withFetch(
      async () => {
        throw new TypeError('Failed to fetch');
      },
      async () => {
        await click('#reload');
        await until(() => !$('#retry').hidden);
        expect(status(), 'Есть текст ошибки').not.toBe('');
      },
    );
  });

  it('пустой массив: сообщение, список пуст, кнопки «Повторить» нет', async () => {
    await withFetch(async () => new Response('[]', { status: 200 }), async () => {
      await click('#reload');
      await until(() => status() !== '' && $('#retry').hidden);
      expect(rows(), 'Список пуст').toHaveLength(0);
      expect(status(), 'Есть сообщение о пустом списке').not.toBe('');
      expect($('#retry').hidden, 'Кнопка скрыта').toBe(true);
    });
  });

  it('пока запрос не закончился, «Обновить» не создаёт второй', async () => {
    let count = 0;
    let release;
    await withFetch(
      () => {
        count++;
        return new Promise((resolve) => {
          release = () => resolve(new Response('[{"id":1,"city":"Тверь","status":"в пути"}]', { status: 200 }));
        });
      },
      async () => {
        await click('#reload');
        await click('#reload');
        await click('#reload');
        expect(count, 'Три нажатия — один запрос').toBe(1);
        release();
        await until(() => rows().length === 1);
        await click('#reload');
        expect(count, 'После завершения новый запрос разрешён').toBe(2);
        release();
        await until(() => rows().length === 1);
      },
    );
  });

  it('после ошибки сети следующая загрузка снова возможна', async () => {
    await withFetch(
      async () => {
        throw new TypeError('Failed to fetch');
      },
      async () => {
        await click('#reload');
        await until(() => !$('#retry').hidden);
      },
    );
    await withFetch(async () => new Response('[{"id":2,"city":"Омск","status":"в пути"}]', { status: 200 }), async () => {
      await click('#retry');
      await until(() => rows().length === 1);
      expect(status(), 'Статус пуст').toBe('');
      expect($('#retry').hidden, 'Кнопка скрыта').toBe(true);
    });
  });

  it('успешный быстрый ответ: ложного сообщения о таймауте потом нет', async () => {
    await withFetch(async () => new Response('[{"id":3,"city":"Уфа","status":"в пути"}]', { status: 200 }), async () => {
      await click('#reload');
      await until(() => rows().length === 1);
      await wait(900);
      expect(status(), 'Статус остался пустым').toBe('');
      expect($('#retry').hidden, 'Кнопка осталась скрытой').toBe(true);
    });
  });

  it('данные вставляются как текст', async () => {
    await withFetch(async () => new Response('[{"id":4,"city":"<i>Тверь</i>","status":"в пути"}]', { status: 200 }), async () => {
      await click('#reload');
      await until(() => rows().length === 1);
      expect($('#deliveries i'), 'Тег i не должен стать элементом').toBeNull();
      expect(rows()[0], 'Разметка видна как текст').toContain('<i>Тверь</i>');
    });
  });
});
