// Страховка: если страница не отменила отправку, не даём ей перезагрузиться.
globalThis.__submits = [];
document.addEventListener('submit', (event) => {
  globalThis.__submits.push(event.defaultPrevented);
  event.preventDefault();
});

const summary = () => $('#summary').textContent.trim();

describe('Форма «Добавить в корзину»', () => {
  it('страница не перезагружается', async () => {
    globalThis.__submits.length = 0;
    await submit('#add-form');
    expect(globalThis.__submits[0], 'Обработчик отменил действие браузера по умолчанию').toBe(true);
  });

  it('итог для двух штук', async () => {
    $('#gift').checked = false;
    await type('#qty', '2');
    await submit('#add-form');
    expect(summary(), 'Количество 2, упаковка не нужна').toBe('Итого: 6980 ₽');
  });

  it('упаковка добавляет пометку', async () => {
    await type('#qty', '2');
    $('#gift').checked = true;
    await submit('#add-form');
    expect(summary(), 'Количество 2 и упаковка').toBe('Итого: 6980 ₽, подарочная упаковка');
  });
});
