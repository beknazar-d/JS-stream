// Страховка: если страница не отменила отправку, не даём ей перезагрузиться.
globalThis.__submits = globalThis.__submits || [];
document.addEventListener('submit', (event) => {
  globalThis.__submits.push(event.defaultPrevented);
  event.preventDefault();
});

describe('Подписка на поступление', () => {
  it('после отправки в #result есть подтверждение', async () => {
    await type('#sku', 'K-200');
    await submit('#notify-form');
    expect($('#result').textContent.trim(), 'Текст подтверждения').toBe('Подписка на K-200 оформлена');
  });

  it('страница не перезагружается: обработчик вызвал preventDefault', async () => {
    globalThis.__submits.length = 0;
    await type('#sku', 'K-200');
    await submit('#notify-form');
    expect(globalThis.__submits, 'Форма отправлена один раз').toHaveLength(1);
    expect(globalThis.__submits[0], 'Обработчик отменил действие браузера по умолчанию').toBe(true);
  });
});
