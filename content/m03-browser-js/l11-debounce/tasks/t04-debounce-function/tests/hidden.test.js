import { debounce } from './utils.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('debounce: аргументы и серии вызовов', () => {
  it('передаёт все аргументы последнего вызова', async () => {
    const save = fn();
    const debounced = debounce(save, 40);
    debounced('A-1', 3);
    debounced('B-2', 5, 'срочно');
    await sleep(100);
    expect(save, 'fn вызвана один раз').toHaveBeenCalledTimes(1);
    expect(save, 'Все аргументы последнего вызова').toHaveBeenCalledWith('B-2', 5, 'срочно');
  });

  it('вызовы с паузой больше delay срабатывают по отдельности', async () => {
    const save = fn();
    const debounced = debounce(save, 40);
    debounced('первый');
    await sleep(100);
    debounced('второй');
    await sleep(100);
    expect(save, 'Два вызова с паузой дольше delay').toHaveBeenCalledTimes(2);
    expect(save.mock.calls, 'Аргументы двух срабатываний по порядку').toEqual([['первый'], ['второй']]);
  });

  it('cancel отменяет ожидающий вызов', async () => {
    const save = fn();
    const debounced = debounce(save, 40);
    debounced('отмена');
    debounced.cancel();
    await sleep(100);
    expect(save, 'После cancel вызова быть не должно').toHaveBeenCalledTimes(0);
  });

  it('после cancel дебаунс работает снова', async () => {
    const save = fn();
    const debounced = debounce(save, 40);
    debounced('раз');
    debounced.cancel();
    debounced('два');
    await sleep(100);
    expect(save, 'Один вызов после cancel и нового вызова').toHaveBeenCalledTimes(1);
    expect(save, 'Аргумент нового вызова').toHaveBeenCalledWith('два');
  });

  it('cancel без ожидающего вызова не падает', () => {
    const debounced = debounce(fn(), 40);
    expect(() => debounced.cancel(), 'cancel до первого вызова').not.toThrow();
  });

  it('два независимых debounce не мешают друг другу', async () => {
    const a = fn();
    const b = fn();
    const da = debounce(a, 40);
    const db = debounce(b, 40);
    da('a');
    db('b');
    await sleep(100);
    expect(a, 'Первая функция').toHaveBeenCalledTimes(1);
    expect(b, 'Вторая функция вызвана независимо от первой').toHaveBeenCalledTimes(1);
  });
});
