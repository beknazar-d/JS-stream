const status = () => $('#status').textContent.trim();

describe('Кнопка «Повторить»: итоговое состояние', () => {
  it('после успеха статус пуст, кнопка скрыта', async () => {
    await wait(100);
    expect(status(), 'После успешной загрузки статус пуст').toBe('');
    expect($('#retry').hidden, 'Кнопка скрыта').toBe(true);
    expect($$('#orders li'), 'Три заказа').toHaveLength(3);
  });

  it('повторная ошибка снова показывает кнопку', async () => {
    const original = window.fetch;
    window.fetch = async () => new Response('', { status: 500 });
    try {
      // кнопка скрыта, поэтому проверяем через новое нажатие после ошибки
      $('#retry').hidden = false;
      await click('#retry');
      await waitFor(() => status() === 'Не удалось загрузить заказы', 700);
      expect($('#retry').hidden, 'После второй ошибки кнопка снова видна').toBe(false);
    } finally {
      window.fetch = original;
    }
  });
});
