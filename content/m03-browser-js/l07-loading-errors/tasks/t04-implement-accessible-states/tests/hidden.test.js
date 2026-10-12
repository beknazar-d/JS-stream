const until = (condition) => waitFor(condition, 900);
const status = () => $('#status').textContent.trim();
const rows = () => $$('#deliveries li').map((li) => li.textContent.trim());
const busy = () => $('#deliveries').getAttribute('aria-busy');

async function withFetch(stub, action) {
  await wait(350); // дожидаемся ответов на запросы из прошлых тестов
  const original = window.fetch;
  window.fetch = stub;
  try {
    await action();
  } finally {
    window.fetch = original;
  }
}

describe('Доступные состояния: другие исходы', () => {
  it('пустой ответ: сообщение, кнопки «Повторить» нет, aria-busy снят', async () => {
    await withFetch(async () => new Response('[]', { status: 200 }), async () => {
      await click('#reload');
      await until(() => status() === 'Доставок пока нет');
      expect($('#retry').hidden, 'Кнопка скрыта').toBe(true);
      expect(rows(), 'Список пуст').toHaveLength(0);
      expect(busy(), 'aria-busy снят').not.toBe('true');
    });
  });

  it('нет соединения: сообщение, кнопка и фокус на ней', async () => {
    await withFetch(
      async () => {
        throw new TypeError('Failed to fetch');
      },
      async () => {
        globalThis.__focused.length = 0;
        await click('#reload');
        await until(() => status() === 'Нет соединения с сервером');
        expect($('#retry').hidden, 'Кнопка показана').toBe(false);
        expect(globalThis.__focused.at(-1), 'Последний фокус — на #retry').toBe('retry');
        expect(busy(), 'aria-busy снят').not.toBe('true');
      },
    );
  });

  it('во время долгого ответа список помечен занятым', async () => {
    let release;
    await withFetch(
      () => new Promise((resolve) => { release = () => resolve(new Response('[{"id":1,"city":"Пермь","status":"доставлена"}]', { status: 200 })); }),
      async () => {
        await click('#reload');
        expect(status(), 'Идёт загрузка').toBe('Загружаем доставки…');
        expect(busy(), 'Пока ответа нет, aria-busy равен true').toBe('true');
        release();
        await until(() => rows().length === 1);
        expect(busy(), 'После ответа aria-busy снят').not.toBe('true');
        expect(rows()[0], 'Строка доставки').toBe('№1, Пермь — доставлена');
      },
    );
  });

  it('повторная загрузка заменяет список', async () => {
    const data = JSON.stringify([{ id: 5, city: 'Тверь', status: 'в пути' }]);
    await withFetch(async () => new Response(data, { status: 200 }), async () => {
      await click('#reload');
      await until(() => rows().length === 1);
      await click('#reload');
      await wait(80);
      expect(rows(), 'В списке одна доставка').toEqual(['№5, Тверь — в пути']);
    });
  });
});
