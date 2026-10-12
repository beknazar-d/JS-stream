// Фокус проверяем через журнал вызовов focus(): так тест не зависит от того, какое окно сейчас активно.
if (!globalThis.__focusSpy) {
  globalThis.__focusSpy = true;
  globalThis.__focused = [];
  const original = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function (...args) {
    globalThis.__focused.push(this.id);
    return original.apply(this, args);
  };
}

const until = (condition) => waitFor(condition, 900);
const status = () => $('#status').textContent.trim();
const rows = () => $$('#deliveries li').map((li) => li.textContent.trim());
const busy = () => $('#deliveries').getAttribute('aria-busy');

describe('Доступные состояния списка', () => {
  it('#status — живая область', () => {
    const live = $('#status').getAttribute('aria-live');
    const role = $('#status').getAttribute('role');
    expect(live === 'polite' || role === 'status' || role === 'alert', 'У #status нужен aria-live или role=status').toBe(true);
  });

  it('загрузка: текст, aria-busy, кнопка скрыта', () => {
    expect(status(), 'Текст загрузки').toBe('Загружаем доставки…');
    expect(busy(), 'Список помечен занятым').toBe('true');
    expect($('#retry').hidden, 'Кнопка скрыта').toBe(true);
  });

  it('ошибка 503: сообщение, кнопка, фокус, aria-busy снят', async () => {
    await until(() => status().includes('503'));
    expect(status(), 'Сообщение об ошибке').toBe('Не удалось загрузить доставки (503)');
    expect($('#retry').hidden, 'Кнопка показана').toBe(false);
    expect(globalThis.__focused, 'Фокус переведён на #retry').toContain('retry');
    expect(busy(), 'aria-busy снят').not.toBe('true');
  });

  it('«Повторить»: список доставок', async () => {
    await click('#retry');
    await until(() => rows().length === 2);
    expect(rows(), 'Строки списка').toEqual(['№1042, Казань — в пути', '№1043, Самара — собирается']);
    expect(status(), 'Статус пуст').toBe('');
    expect(busy(), 'aria-busy снят').not.toBe('true');
  });
});
