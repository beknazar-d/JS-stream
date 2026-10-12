const until = (condition) => waitFor(condition, 700);
const stock = (n) => $('.card:nth-child(' + n + ') .stock').textContent.trim();

describe('Проверка наличия: граничные случаи', () => {
  it('другие карточки не меняются', async () => {
    for (const n of [1, 2, 3]) $('.card:nth-child(' + n + ') .stock').textContent = '';
    await click('.card:nth-child(1) .check');
    await until(() => stock(1) !== '');
    await wait(100);
    expect(stock(2) + stock(3), 'Вторая и третья карточки остались пустыми').toBe('');
  });

  it('склад недоступен: сообщение со статусом', async () => {
    const original = window.fetch;
    window.fetch = async () => new Response('Service Unavailable', { status: 503 });
    try {
      await click('.card:nth-child(1) .check');
      await until(() => stock(1).includes('503'));
      expect(stock(1), 'Сообщение для 503').toBe('Не удалось проверить наличие (503)');
    } finally {
      window.fetch = original;
    }
  });

  it('остаток 1 — тоже «В наличии»', async () => {
    const original = window.fetch;
    window.fetch = async () => new Response(JSON.stringify({ sku: 'K-200', left: 1 }), { status: 200 });
    try {
      await click('.card:nth-child(1) .check');
      await until(() => stock(1) === 'В наличии: 1 шт.');
      expect(stock(1), 'Остаток 1').toBe('В наличии: 1 шт.');
    } finally {
      window.fetch = original;
    }
  });

  it('артикул в адресе кодируется', async () => {
    const original = window.fetch;
    const urls = [];
    window.fetch = async (url) => {
      urls.push(String(url));
      return new Response(JSON.stringify({ left: 2 }), { status: 200 });
    };
    try {
      $('.card:nth-child(3)').dataset.sku = 'T 2&x';
      await click('.card:nth-child(3) .check');
      await until(() => urls.length > 0);
      expect(urls[0], 'Адрес с закодированным артикулом').toBe('/api/stock?sku=T%202%26x');
    } finally {
      window.fetch = original;
      $('.card:nth-child(3)').dataset.sku = 'T-2';
    }
  });
});
