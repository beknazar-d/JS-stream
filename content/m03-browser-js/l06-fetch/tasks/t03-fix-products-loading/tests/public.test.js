// Короткое ожидание: если код неверен, тесты должны падать быстро, а не по общему таймауту.
const until = (condition) => waitFor(condition, 700);

const items = () => $$('#products li').map((li) => li.textContent.trim());

describe('Каталог загружается', () => {
  it('три товара выведены строками', async () => {
    await until(() => items().length === 3);
    expect(items(), 'Строки списка').toEqual(['Чайник K-200 — 3490 ₽', 'Блендер B-50 — 4990 ₽', 'Тостер T-2 — 2190 ₽']);
  });

  it('статус пуст после успешной загрузки', async () => {
    await until(() => items().length === 3);
    expect($('#status').textContent.trim(), 'Сообщение об ошибке не должно висеть').toBe('');
  });
});
