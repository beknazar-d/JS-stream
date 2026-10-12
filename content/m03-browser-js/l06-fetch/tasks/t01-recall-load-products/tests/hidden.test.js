// Короткое ожидание: если код неверен, тесты должны падать быстро, а не по общему таймауту.
const until = (condition) => waitFor(condition, 700);

const items = () => $$('#products li').map((li) => li.textContent.trim());

describe('Список товаров: обновление', () => {
  it('кнопка «Обновить» делает новый запрос и не дублирует товары', async () => {
    await until(() => items().length === 3);
    const before = api().calls.length;
    await click('#reload');
    await until(() => api().calls.length === before + 1);
    await wait(200);
    expect(items(), 'После обновления товаров столько же, сколько в ответе').toHaveLength(3);
  });

  it('название товара выводится как текст', async () => {
    const original = window.fetch;
    window.fetch = async () =>
      new Response(JSON.stringify([{ id: 9, title: '<b>Фен</b>', price: 990, inStock: true }]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    try {
      await click('#reload');
      await until(() => items().length === 1 && items()[0].includes('Фен'));
      expect($('#products li b'), 'Разметка из названия не должна стать элементом').toBeNull();
      expect(items()[0], 'Текст виден как есть').toBe('<b>Фен</b> — 990 ₽');
    } finally {
      window.fetch = original;
    }
  });

  it('пустой ответ сервера даёт пустой список', async () => {
    const original = window.fetch;
    let release;
    window.fetch = () =>
      new Promise((resolve) => {
        release = () => resolve(new Response('[]', { status: 200 }));
      });
    try {
      await click('#reload');
      await wait(30);
      release();
      await until(() => items().length === 0);
      expect(items(), 'Пустой ответ даёт пустой список').toHaveLength(0);
    } finally {
      window.fetch = original;
    }
  });
});
