const until = (condition) => waitFor(condition, 900);
const status = () => $('#status').textContent.trim();
const rows = () => $$('#orders li').map((li) => li.textContent.trim());

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

describe('Состояния списка заказов: граничные случаи', () => {
  it('пустой массив: «Заказов пока нет», кнопки «Повторить» нет', async () => {
    await withFetch(async () => new Response('[]', { status: 200 }), async () => {
      await click('#reload');
      await until(() => status() === 'Заказов пока нет');
      expect(rows(), 'Список пуст').toHaveLength(0);
      expect($('#retry').hidden, 'Кнопка «Повторить» скрыта').toBe(true);
    });
  });

  it('нет соединения: сообщение и кнопка', async () => {
    await withFetch(
      async () => {
        throw new TypeError('Failed to fetch');
      },
      async () => {
        await click('#reload');
        await until(() => status() === 'Нет соединения с сервером');
        expect($('#retry').hidden, 'Кнопка «Повторить» показана').toBe(false);
      },
    );
  });

  it('повторная загрузка заменяет список', async () => {
    const orders = [{ id: 1, total: 100 }, { id: 2, total: 200 }];
    await withFetch(async () => new Response(JSON.stringify(orders), { status: 200 }), async () => {
      await click('#reload');
      await until(() => rows().length === 2);
      await click('#reload');
      await wait(100);
      expect(rows(), 'Заказов по-прежнему два').toEqual(['Заказ №1 — 100 ₽', 'Заказ №2 — 200 ₽']);
    });
  });

  it('после ошибки сети успешная загрузка скрывает кнопку', async () => {
    await withFetch(
      async () => {
        throw new TypeError('Failed to fetch');
      },
      async () => {
        await click('#reload');
        await until(() => !$('#retry').hidden);
      },
    );
    await withFetch(async () => new Response('[{"id":5,"total":50}]', { status: 200 }), async () => {
      await click('#reload');
      await until(() => rows().length === 1);
      expect($('#retry').hidden, 'Кнопка скрыта после успеха').toBe(true);
      expect(status(), 'Статус пуст').toBe('');
    });
  });
});
