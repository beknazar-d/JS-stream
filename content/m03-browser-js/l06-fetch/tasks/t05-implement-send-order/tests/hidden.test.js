const until = (condition) => waitFor(condition, 700);
const status = () => $('#status').textContent.trim();

async function withReply(makeResponse, action) {
  await wait(100); // дожидаемся ответов на запросы из прошлых тестов
  $('#status').textContent = '';
  const original = window.fetch;
  window.fetch = async () => makeResponse();
  try {
    await action();
  } finally {
    window.fetch = original;
  }
}

describe('Отправка заказа: ответы сервера', () => {
  it('422: показан текст из поля error', async () => {
    await withReply(
      () => new Response(JSON.stringify({ error: 'Количество должно быть от 1 до 10' }), { status: 422 }),
      async () => {
        await type('#name', 'Анна');
        await type('#qty', '10');
        await submit('#order-form');
        await until(() => status() !== '');
        expect(status(), 'Сообщение с причиной').toBe('Не удалось оформить заказ: Количество должно быть от 1 до 10');
      },
    );
  });

  it('500 с текстом вместо JSON: сообщение со статусом', async () => {
    await withReply(
      () => new Response('Internal Server Error', { status: 500 }),
      async () => {
        await type('#name', 'Анна');
        await type('#qty', '1');
        await submit('#order-form');
        await until(() => status() !== '');
        expect(status(), 'Сообщение со статусом').toBe('Не удалось оформить заказ (500)');
      },
    );
  });

  it('ошибка в JSON без поля error: сообщение со статусом', async () => {
    await withReply(
      () => new Response(JSON.stringify({ message: 'oops' }), { status: 502 }),
      async () => {
        await type('#name', 'Анна');
        await type('#qty', '1');
        await submit('#order-form');
        await until(() => status() !== '');
        expect(status(), 'Тело без error').toBe('Не удалось оформить заказ (502)');
      },
    );
  });

  it('номер заказа берётся из ответа', async () => {
    await withReply(
      () => new Response(JSON.stringify({ id: 7 }), { status: 201 }),
      async () => {
        await type('#name', 'Игорь');
        await type('#qty', '3');
        await submit('#order-form');
        await until(() => status() === 'Заказ №7 принят');
        expect(status(), 'Другой номер заказа').toBe('Заказ №7 принят');
      },
    );
  });
});
