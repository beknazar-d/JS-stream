import { reindexCatalog } from './index.js';
import { makeProducts } from './helpers.js';

describe('reindexCatalog: результат', () => {
  it('обрабатывает все товары по порядку и возвращает их количество', async () => {
    timers.useFake();
    const seen = [];
    const products = makeProducts(250);
    const result = reindexCatalog(products, (p) => seen.push(p.sku), 100);
    await timers.runAll();
    await expect(result, 'Промис выполняется количеством обработанных товаров').resolves.toBe(250);
    expect(seen, 'Все товары по одному разу и в исходном порядке').toEqual(products.map((p) => p.sku));
  });
});

describe('reindexCatalog: поток не блокируется', () => {
  it('между частями успевает сработать чужой таймер', async () => {
    timers.useFake();
    const events = [];
    setTimeout(() => events.push('тик'), 0);
    const result = reindexCatalog(makeProducts(250), () => events.push('товар'), 100);
    await timers.runAll();
    await result;
    const tick = events.indexOf('тик');
    expect(tick, 'Таймер должен сработать').toBeGreaterThanOrEqual(0);
    expect(tick, 'Таймер сработал до окончания переиндексации, а не после всех товаров').toBeLessThan(events.length - 1);
  });
});
