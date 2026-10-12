globalThis.__submits = [];
document.addEventListener('submit', (event) => {
  globalThis.__submits.push(event.defaultPrevented);
  event.preventDefault();
});

const until = (condition) => waitFor(condition, 700);
const status = () => $('#status').textContent.trim();

describe('Отправка заказа', () => {
  it('страница не перезагружается', async () => {
    globalThis.__submits.length = 0;
    await type('#name', 'Анна');
    await type('#qty', '2');
    await submit('#order-form');
    await until(() => status() !== '');
    expect(globalThis.__submits[0], 'Обработчик отменил действие по умолчанию').toBe(true);
  });

  it('на сервер уходит POST с JSON', async () => {
    const original = window.fetch;
    const seen = [];
    window.fetch = (url, init) => {
      seen.push({ url: String(url), init: init || {} });
      return original(url, init);
    };
    try {
      await type('#name', '  Анна ');
      await type('#qty', '2');
      await submit('#order-form');
      await until(() => seen.length > 0);
      const { url, init } = seen[0];
      expect(url, 'Адрес запроса').toBe('/api/orders');
      expect((init.method || 'GET').toUpperCase(), 'Метод запроса').toBe('POST');
      expect(new Headers(init.headers).get('content-type'), 'Заголовок Content-Type').toBe('application/json');
      expect(JSON.parse(init.body), 'Тело запроса: имя без пробелов, количество числом').toEqual({ name: 'Анна', qty: 2 });
    } finally {
      window.fetch = original;
    }
  });

  it('заказ создан: номер из ответа', async () => {
    await type('#name', 'Анна');
    await type('#qty', '2');
    await submit('#order-form');
    await until(() => status() === 'Заказ №1042 принят');
    expect(status(), 'Сообщение об успехе').toBe('Заказ №1042 принят');
  });
});
