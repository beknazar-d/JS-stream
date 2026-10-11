// Раннер заданий на страницу в настоящем Chromium (playwright).
import ts from 'typescript';
import { afterAll, describe, expect, it } from 'vitest';
import { compileAll, guardPageScripts } from '../src/compile.ts';
import { buildDocument } from '../src/html.ts';
import { evaluate, type TaskBundle } from '../src/evaluate.ts';
import { createPool } from '../node/pool.ts';
import { createPageRunner } from '../node/page-runner.ts';

const pool = createPool(5000, 1);
const pages = createPageRunner();
afterAll(async () => {
  await pool.close();
  await pages.close();
});
const deps = {
  compile: async (files: Record<string, string>) => compileAll(ts, files),
  execute: pool.execute,
  executeHtml: pages.executeHtml,
  guardLoops: async (files: Record<string, string>) => guardPageScripts(ts, files),
};

const bundle: TaskBundle = {
  id: 'test/page',
  description: '',
  meta: { order: 1, title: 'Каталог', type: 'layout', role: 'main', difficulty: 2, minutes: 5, language: 'html', tags: ['css'], hints: ['a', 'b', 'c'], wrong: [] },
  files: {
    'tests/api.mock.json': JSON.stringify({ routes: [{ path: '/api/products', body: [{ id: 1, name: 'Чайник' }], delayMs: 50 }] }),
    'tests/public.test.js': `
      describe('каталог', () => {
        it('три колонки на широком экране', () => {
          expect(css('.grid', 'grid-template-columns').split(' ').length).toBe(3);
        });
        it('одна колонка на телефоне', async () => {
          await viewport(375);
          expect(css('.grid', 'grid-template-columns').split(' ').length).toBe(1);
          await viewport(1024);
        });
        it('товары из API', async () => {
          const item = await waitFor(() => $('.grid li'));
          expect(item.textContent).toBe('Чайник');
          expect($$('.grid li')).toHaveLength(1);
          expect(api().calls[0].path).toBe('/api/products');
        });
        it('клик не вешает страницу', async () => {
          await click('button');
          expect(labelOf('button')).toBe('Добавить в корзину');
        });
      });`,
  },
};

const page = {
  'index.html': '<!doctype html><html><head><link rel="stylesheet" href="styles.css"></head><body><ul class="grid"></ul><button aria-label="Добавить в корзину">+</button><script src="script.js"></script></body></html>',
  'styles.css': '.grid{display:grid;grid-template-columns:repeat(3,1fr)} @media (max-width:600px){.grid{grid-template-columns:1fr}}',
  'script.js': "fetch('/api/products').then(r=>r.json()).then(items=>{document.querySelector('.grid').innerHTML=items.map(i=>'<li>'+i.name+'</li>').join('')})",
};

describe('buildDocument', () => {
  it('встраивает файлы и не портит $ в коде обвязки', () => {
    const html = buildDocument(page, { harness: 'window.$$ = 1; "$&"' });
    expect(html).toContain('<style data-file="styles.css">');
    expect(html).toContain('<script data-file="script.js">');
    expect(html).toContain('window.$$ = 1; "$&"');
  });
});

describe('задания на страницу в Chromium', () => {
  it('правильная вёрстка проходит все проверки', async () => {
    const report = await evaluate(bundle, page, deps);
    expect(report.checks.filter((c) => c.status === 'failed')).toEqual([]);
    expect(report.status).toBe('passed');
  }, 30000);

  it('без медиазапроса и с ошибкой в скрипте — понятные провалы', async () => {
    const report = await evaluate(bundle, { ...page, 'styles.css': '.grid{display:grid;grid-template-columns:repeat(3,1fr)}', 'script.js': 'loadProducts()' }, deps);
    expect(report.status).toBe('failed');
    expect(report.logs[0].text).toMatch(/loadProducts is not defined/);
  }, 30000);

  it('бесконечный цикл в обработчике прерывается', async () => {
    const report = await evaluate(bundle, { ...page, 'script.js': `${page['script.js']}; document.querySelector('button').onclick = () => { while (true) {} };` }, deps);
    expect(report.status).toBe('passed');
    expect(report.logs.some((l) => /бесконечный/.test(l.text))).toBe(true);
  }, 30000);
});
