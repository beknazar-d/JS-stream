const until = (condition) => waitFor(condition, 700);
const titles = () => $$('#products li.product h3').map((h) => h.textContent.trim());

async function withReply(makeResponse, action) {
  await wait(100); // дожидаемся ответов на запросы из прошлых тестов
  const original = window.fetch;
  window.fetch = async () => makeResponse();
  try {
    await action();
  } finally {
    window.fetch = original;
  }
}

describe('Каталог из API: граничные случаи', () => {
  it('пустой ответ: нет карточек и есть сообщение', async () => {
    await withReply(
      () => new Response('[]', { status: 200 }),
      async () => {
        await click('#reload');
        await until(() => titles().length === 0 && $('#status').textContent.trim() !== '');
        expect(titles(), 'Карточек нет').toHaveLength(0);
        expect($('#status').textContent.trim(), 'Сообщение о пустом каталоге').not.toBe('');
      },
    );
  });

  it('кнопка «Обновить» заменяет список новыми данными', async () => {
    await withReply(
      () => new Response(JSON.stringify([{ id: 7, title: 'Фен F-1', price: 990, inStock: true }]), { status: 200 }),
      async () => {
        await click('#reload');
        await until(() => titles().length === 1);
        expect(titles(), 'Список заменён, а не дополнен').toEqual(['Фен F-1']);
      },
    );
  });

  it('название вставляется как текст', async () => {
    await withReply(
      () => new Response(JSON.stringify([{ id: 8, title: '<b>Фен</b> F-2', price: 1990, inStock: true }]), { status: 200 }),
      async () => {
        await click('#reload');
        await until(() => titles().length === 1);
        expect($('#products li.product b'), 'Тег b не должен стать элементом').toBeNull();
        expect(titles()[0], 'Разметка видна как текст').toBe('<b>Фен</b> F-2');
      },
    );
  });

  it('фильтр работает и для обновлённого списка', async () => {
    await withReply(
      () =>
        new Response(
          JSON.stringify([
            { id: 1, title: 'Фен F-1', price: 990, inStock: false },
            { id: 2, title: 'Утюг U-3', price: 2990, inStock: true },
          ]),
          { status: 200 },
        ),
      async () => {
        const box = $('#only-in-stock');
        box.checked = false;
        await click('#reload');
        await until(() => titles().length === 2);
        box.checked = true;
        box.dispatchEvent(new Event('change', { bubbles: true }));
        await wait(30);
        expect(titles(), 'Только Утюг в наличии').toEqual(['Утюг U-3']);
        box.checked = false;
        box.dispatchEvent(new Event('change', { bubbles: true }));
      },
    );
  });
});
