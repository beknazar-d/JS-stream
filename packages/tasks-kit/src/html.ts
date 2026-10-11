// Задания на HTML, CSS и DOM: сборка страницы для iframe с sandbox.
// Файлы человека (index.html, styles.css, script.js) собираются в один
// документ: стили и скрипты встраиваются, перед ними ставится мок API,
// в конец — обвязка, которая запускает тесты внутри страницы.

import type { ExecJob } from './exec.ts';

// Запуск задания на страницу: файлы страницы, мок API и скомпилированные тесты.
// Документ собирает исполнитель, потому что только он знает код обвязки.
export interface HtmlRun extends ExecJob {
  pageFiles: Record<string, string>;
  api?: MockApi;
  // Ширина окна по умолчанию, px. Тесты меняют её через viewport().
  width?: number;
}

export interface MockRoute {
  method?: string;
  // Путь без домена: /api/products. Можно с параметрами запроса.
  path: string;
  status?: number;
  body?: unknown;
  headers?: Record<string, string>;
  delayMs?: number;
  // Последовательность ответов для нестабильного API: каждый запрос берёт следующий,
  // последний повторяется.
  responses?: { status?: number; body?: unknown; delayMs?: number }[];
}

export interface MockApi {
  routes: MockRoute[];
  // Начальное содержимое localStorage страницы.
  storage?: Record<string, string>;
}

const escapeScript = (code: string) => code.replace(/<\/script/gi, '<\\/script');
const escapeStyle = (code: string) => code.replace(/<\/style/gi, '<\\/style');

// Мок fetch внутри страницы: никаких сетевых запросов, ответы из api.mock.json.
// Вызовы сохраняются в window.__api.calls, чтобы тесты могли их проверить.
export function mockScript(api: MockApi | undefined): string {
  return `(() => {
  // Ошибки и вывод консоли страницы собираются для отчёта.
  window.__pageErrors = [];
  window.__pageLogs = [];
  window.addEventListener('error', (e) => window.__pageErrors.push(e.message || String(e.error)));
  window.addEventListener('unhandledrejection', (e) => window.__pageErrors.push('Необработанный отказ промиса: ' + (e.reason && e.reason.message || e.reason)));
  for (const level of ['log', 'info', 'warn', 'error']) {
    const original = console[level].bind(console);
    console[level] = (...args) => {
      window.__pageLogs.push({ level, args });
      original(...args);
    };
  }
  // Хранилища и история в памяти: у страницы в sandbox нет своего источника,
  // и настоящие localStorage и pushState браузер запрещает.
  const makeStorage = (initial) => {
    const data = new Map(Object.entries(initial || {}));
    const storage = {
      get length() { return data.size; },
      key: (i) => [...data.keys()][i] ?? null,
      getItem: (k) => (data.has(String(k)) ? data.get(String(k)) : null),
      setItem: (k, v) => { data.set(String(k), String(v)); },
      removeItem: (k) => { data.delete(String(k)); },
      clear: () => data.clear(),
    };
    return storage;
  };
  Object.defineProperty(window, 'localStorage', { configurable: true, value: makeStorage(${JSON.stringify(api?.storage ?? {})}) });
  Object.defineProperty(window, 'sessionStorage', { configurable: true, value: makeStorage({}) });
  const entries = [{ state: null, url: '/' }];
  let index = 0;
  const resolveUrl = (url) => (url == null ? entries[index].url : new URL(String(url), 'https://shop.example' + entries[index].url).pathname + new URL(String(url), 'https://shop.example' + entries[index].url).search);
  window.__history = { entries, get current() { return entries[index]; } };
  history.pushState = (state, _title, url) => { entries.splice(index + 1); entries.push({ state, url: resolveUrl(url) }); index++; };
  history.replaceState = (state, _title, url) => { entries[index] = { state, url: resolveUrl(url) }; };
  const go = (delta) => {
    const next = index + delta;
    if (next < 0 || next >= entries.length) return;
    index = next;
    setTimeout(() => window.dispatchEvent(new PopStateEvent('popstate', { state: entries[index].state })), 0);
  };
  history.back = () => go(-1);
  history.forward = () => go(1);
  history.go = (d = 0) => go(d);
  Object.defineProperty(history, 'state', { configurable: true, get: () => entries[index].state });

  const routes = ${JSON.stringify(api?.routes ?? [])};
  const counters = new Map();
  const calls = [];
  window.__api = { calls };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  window.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url, 'https://shop.example');
    const method = (init.method || (typeof input === 'object' && input.method) || 'GET').toUpperCase();
    const call = { method, path: url.pathname, query: Object.fromEntries(url.searchParams), body: init.body ?? null };
    calls.push(call);
    if (init.signal && init.signal.aborted) throw new DOMException('The operation was aborted.', 'AbortError');
    const route = routes.find((r) => (r.method || 'GET').toUpperCase() === method && (r.path === url.pathname || r.path === url.pathname + url.search));
    let answer = route ? { status: route.status, body: route.body, delayMs: route.delayMs, headers: route.headers } : { status: 404, body: { error: 'Not found' } };
    if (route && route.responses && route.responses.length) {
      const key = method + ' ' + route.path;
      const index = counters.get(key) || 0;
      counters.set(key, index + 1);
      answer = { ...answer, ...route.responses[Math.min(index, route.responses.length - 1)] };
    }
    if (answer.delayMs) {
      await new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, answer.delayMs);
        if (init.signal) init.signal.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('The operation was aborted.', 'AbortError')); });
      });
    }
    const text = answer.body === undefined ? '' : typeof answer.body === 'string' ? answer.body : JSON.stringify(answer.body);
    return new Response(text, { status: answer.status || 200, headers: { 'Content-Type': 'application/json', ...(answer.headers || {}) } });
  };
})();`;
}

// Встраивает файлы в index.html. link и script с локальными файлами
// заменяются содержимым; всё остальное остаётся как написал человек.
export function buildDocument(
  files: Record<string, string>,
  options: { harness: string; api?: MockApi },
): string {
  let html = files['index.html'] ?? '<!doctype html><html><head></head><body></body></html>';

  html = html.replace(/<link\b[^>]*>/gi, (tag) => {
    const href = tag.match(/href\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!href || !/stylesheet/i.test(tag)) return tag;
    const name = href.replace(/^\.\//, '');
    return name in files ? `<style data-file="${name}">\n${escapeStyle(files[name])}\n</style>` : tag;
  });

  html = html.replace(/<script\b([^>]*)\bsrc\s*=\s*["']([^"']+)["']([^>]*)>\s*<\/script>/gi, (tag, before, src, after) => {
    const name = String(src).replace(/^\.\//, '');
    if (!(name in files)) return tag;
    const attrs = `${before} ${after}`.replace(/\s+/g, ' ').trim();
    return `<script${attrs ? ` ${attrs}` : ''} data-file="${name}">\n${escapeScript(files[name])}\n</script>`;
  });

  const head = `<script>${escapeScript(mockScript(options.api))}</script>`;
  // Замена только функцией: в строке замены `$$` и `$&` — спецсимволы.
  if (/<head[^>]*>/i.test(html)) html = html.replace(/<head[^>]*>/i, (m) => `${m}\n${head}`);
  else html = head + html;

  const tail = `<script>${escapeScript(options.harness)}</script>`;
  if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, () => `${tail}\n</body>`);
  else html += tail;
  return html;
}
