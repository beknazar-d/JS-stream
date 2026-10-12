const titles = () => $$('#results li').map((li) => li.textContent);

describe('Устаревшие ответы', () => {
  it('медленный ответ на «чай» не заменяет список «чайник»', async () => {
    const original = window.fetch;
    const signals = [];
    window.fetch = (url, init) => {
      signals.push(init && init.signal);
      return original(url, init);
    };
    try {
      await type('#search', 'утюг');
      await waitFor(() => titles().length === 1, 800);
      signals.length = 0;
      await type('#search', 'чай');
      await wait(340);
      await type('#search', 'чайник');
      await wait(300);
      await waitFor(() => titles().length === 2, 800);
      await wait(700);
      expect(titles(), 'Через секунду после ввода «чайник» на экране список по «чайник», а не по «чай»').toHaveLength(2);
      expect(titles()[0], 'Список по «чайник»').toContain('Электрический чайник Domo K-17');
      expect(signals.length, 'Было два запроса: «чай» и «чайник»').toBe(2);
      expect(signals[0] && signals[0].aborted, 'Запрос «чай» должен быть отменён через AbortController (передайте signal в fetch)').toBe(true);
    } finally {
      window.fetch = original;
    }
  });

  it('отмена не выглядит как ошибка', async () => {
    expect($('#status').textContent, 'После отменённого запроса статус пуст').toBe('');
    expect($('#retry').hidden, 'Кнопка повтора скрыта после отмены').toBe(true);
  });
});

describe('Ошибка сервера и повтор', () => {
  it('при ответе 503 показан статус ошибки и кнопка «Повторить»', async () => {
    await type('#search', 'пылесос');
    await waitFor(() => $('#status').textContent.includes('Не удалось загрузить'), 1200);
    expect($('#status').textContent, 'Статус при ошибке сервера').toBe('Не удалось загрузить результаты');
    expect($('#retry').hidden, 'Кнопка повтора видна').toBe(false);
  });

  it('повтор делает тот же запрос и при успехе очищает ошибку', async () => {
    const before = api().calls.length;
    await click('#retry');
    await waitFor(() => titles().length === 1, 1000);
    const calls = api().calls.slice(before);
    expect(calls.map((c) => c.query.q), 'Повтор отправляет последний запрос').toEqual(['пылесос']);
    expect(titles()[0], 'Результат повторного запроса').toContain('Пылесос Domo V-300');
    expect($('#status').textContent, 'После успешного повтора статус пуст').toBe('');
    expect($('#retry').hidden, 'Кнопка повтора снова скрыта').toBe(true);
  });
});
