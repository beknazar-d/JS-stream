// Короткое ожидание: если код неверен, тесты должны падать быстро, а не по общему таймауту.
const until = (condition) => waitFor(condition, 700);

const items = () => $$('#products li').map((li) => li.textContent.trim());

describe('Каталог: обновление и ошибки', () => {
  it('обновление заменяет список, а не дополняет', async () => {
    await until(() => items().length === 3);
    await click('#reload');
    await until(() => api().calls.length >= 2);
    await wait(100);
    expect(items(), 'После обновления товаров по-прежнему три').toHaveLength(3);
  });

  it('ответ 500: сообщение со статусом, список не меняется', async () => {
    await until(() => items().length === 3);
    const original = window.fetch;
    window.fetch = async () => new Response(JSON.stringify({ error: 'Внутренняя ошибка' }), { status: 500 });
    try {
      await click('#reload');
      await until(() => $('#status').textContent.trim() !== '');
      expect($('#status').textContent.trim(), 'Сообщение об ошибке').toBe('Не удалось загрузить товары (500)');
      expect(items(), 'Список остался прежним').toHaveLength(3);
    } finally {
      window.fetch = original;
    }
  });

  it('после ошибки успешное обновление убирает сообщение', async () => {
    const original = window.fetch;
    window.fetch = async () => new Response('{}', { status: 503 });
    try {
      await click('#reload');
      await until(() => $('#status').textContent.trim().includes('503'));
    } finally {
      window.fetch = original;
    }
    await click('#reload');
    await until(() => $('#status').textContent.trim() === '');
    expect(items(), 'Список после успешной загрузки').toHaveLength(3);
  });

  it('статус в сообщении берётся из ответа', async () => {
    const original = window.fetch;
    window.fetch = async () => new Response('Not Found', { status: 404 });
    try {
      await click('#reload');
      await until(() => $('#status').textContent.trim() !== '');
      expect($('#status').textContent.trim(), 'Сообщение для 404').toBe('Не удалось загрузить товары (404)');
    } finally {
      window.fetch = original;
    }
  });
});
