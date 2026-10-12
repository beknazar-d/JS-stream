import { debounce } from './utils.js';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe('debounce: основное поведение', () => {
  it('возвращает функцию', () => {
    const debounced = debounce(() => {}, 20);
    expect(debounced, 'debounce должна вернуть функцию').toBeTypeOf('function');
  });

  it('три быстрых вызова дают один вызов fn', async () => {
    const search = fn();
    const debounced = debounce(search, 60);
    debounced('ч');
    await sleep(10);
    debounced('чай');
    await sleep(10);
    debounced('чайник');
    await sleep(120);
    expect(search, 'fn после трёх вызовов подряд').toHaveBeenCalledTimes(1);
    expect(search, 'fn получает аргумент последнего вызова').toHaveBeenCalledWith('чайник');
  });

  it('fn не вызывается раньше, чем пройдёт delay', async () => {
    const search = fn();
    const debounced = debounce(search, 80);
    debounced('утюг');
    await sleep(30);
    expect(search, 'Через 30 мс из 80 вызова быть не должно').toHaveBeenCalledTimes(0);
    await sleep(100);
    expect(search, 'Через 130 мс вызов уже был').toHaveBeenCalledTimes(1);
  });
});
