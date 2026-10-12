import { reindexCatalog } from './index.js';
import { makeProducts } from './helpers.js';

// Помечаем начало каждой задачи: считаем, сколько товаров обработано между метками.
function trackTasks() {
  const events = [];
  const original = globalThis.setTimeout;
  globalThis.setTimeout = (callback, ms, ...args) =>
    original(() => {
      events.push('задача');
      callback(...args);
    }, ms, ...args);
  const chunkSizes = () => {
    const sizes = [0];
    for (const event of events) {
      if (event === 'задача') sizes.push(0);
      else sizes[sizes.length - 1] += 1;
    }
    return sizes;
  };
  return { events, chunkSizes };
}

describe('Размер части', () => {
  it('за одну задачу обрабатывается не больше chunkSize товаров', async () => {
    timers.useFake();
    const tracker = trackTasks();
    const result = reindexCatalog(makeProducts(250), () => tracker.events.push('товар'), 100);
    await timers.runAll();
    await result;
    const sizes = tracker.chunkSizes();
    expect(Math.max(...sizes), `Размеры частей: ${sizes.join(', ')}`).toBeLessThanOrEqual(100);
    expect(sizes.reduce((a, b) => a + b, 0), 'Всего обработано').toBe(250);
  });

  it('без chunkSize часть равна 100 товарам', async () => {
    timers.useFake();
    const tracker = trackTasks();
    const result = reindexCatalog(makeProducts(250), () => tracker.events.push('товар'));
    await timers.runAll();
    await result;
    expect(Math.max(...tracker.chunkSizes()), 'Размер части по умолчанию').toBeLessThanOrEqual(100);
  });

  it('товаров меньше, чем размер части', async () => {
    timers.useFake();
    const seen = [];
    const result = reindexCatalog(makeProducts(30), (p) => seen.push(p.sku), 100);
    await timers.runAll();
    await expect(result, 'Промис для 30 товаров').resolves.toBe(30);
    expect(seen, 'Обработаны все 30').toHaveLength(30);
  });

  it('количество товаров делится на часть без остатка', async () => {
    timers.useFake();
    const seen = [];
    const result = reindexCatalog(makeProducts(200), (p) => seen.push(p.sku), 100);
    await timers.runAll();
    await expect(result, 'Промис для 200 товаров').resolves.toBe(200);
    expect(seen, 'Каждый товар один раз').toHaveLength(200);
  });
});

describe('Краевые случаи', () => {
  it('пустой каталог', async () => {
    timers.useFake();
    const result = reindexCatalog([], () => {}, 100);
    await timers.runAll();
    await expect(result, 'Пустой каталог').resolves.toBe(0);
  });

  it('ошибка обработчика отклоняет промис и останавливает обход', async () => {
    timers.useFake();
    const seen = [];
    const result = reindexCatalog(makeProducts(250), (p) => {
      seen.push(p.sku);
      if (p.sku === 'SKU-120') throw new Error('Нет описания у SKU-120');
    }, 100);
    result.catch(() => {});
    await timers.runAll();
    await expect(result, 'Ошибка обработчика').rejects.toThrow('Нет описания у SKU-120');
    expect(seen, 'После ошибки остальные товары не обрабатываются').toHaveLength(120);
  });

  it('две переиндексации одновременно не мешают друг другу', async () => {
    timers.useFake();
    const store = [];
    const shop = [];
    const storeProducts = makeProducts(250).map((p) => ({ sku: `S-${p.sku}` }));
    const shopProducts = makeProducts(180).map((p) => ({ sku: `M-${p.sku}` }));
    const first = reindexCatalog(storeProducts, (p) => store.push(p.sku), 100);
    const second = reindexCatalog(shopProducts, (p) => shop.push(p.sku), 100);
    await timers.runAll();
    await expect(first, 'Склад').resolves.toBe(250);
    await expect(second, 'Магазин').resolves.toBe(180);
    expect(store, 'Товары склада по порядку').toEqual(storeProducts.map((p) => p.sku));
    expect(shop, 'Товары магазина по порядку').toEqual(shopProducts.map((p) => p.sku));
  });
});
