// api.js: учебный «сервер» Домотеки (версия API: 2). Файл менять не нужно.
// Он подменяет fetch для адреса /api/products и отвечает как настоящий сервер:
// с задержкой, с фильтрами и страницами, иногда с ошибкой.
//
// Запрос: GET /api/products?page=1&limit=6
// Параметры: page, limit (по умолчанию 12, не больше 24), q (поиск по названию),
//   category (kitchen, cleaning, climate, laundry), sort (price-asc, price-desc; без sort: по популярности).
// Ответ 200 (версия 2): { data: [{ id, title, category, priceMinor, stock }], meta: { total, page, pages } }
//   priceMinor в копейках, stock — остаток в штуках (0: нет в наличии).
// Ответ 503: { error: "Service Unavailable" }.
//
// Для проверок: window.shopServer (calls, delayMs, delayFor, failNext, catalog, pending).
(function () {
  var API_VERSION = 2;
  var DEFAULT_LIMIT = 12;
  var MAX_LIMIT = 24;

  var server = {
    version: API_VERSION,
    calls: [],
    pending: 0,
    delayMs: 80,
    delayFor: null,
    failNext: 0,
    catalog: null,
  };
  window.shopServer = server;

  var realFetch = window.fetch.bind(window);

  function toPositiveInt(value, fallback) {
    var number = parseInt(value, 10);
    return Number.isFinite(number) && number > 0 ? number : fallback;
  }

  function findProducts(query) {
    var list = (server.catalog || window.PRODUCTS).slice();
    var text = (query.q || '').trim().toLowerCase();
    if (text) {
      list = list.filter(function (product) {
        return product.title.toLowerCase().includes(text);
      });
    }
    if (query.category) {
      list = list.filter(function (product) {
        return product.category === query.category;
      });
    }
    if (query.sort === 'price-asc') {
      list.sort(function (a, b) { return a.price - b.price; });
    }
    if (query.sort === 'price-desc') {
      list.sort(function (a, b) { return b.price - a.price; });
    }
    var limit = Math.min(toPositiveInt(query.limit, DEFAULT_LIMIT), MAX_LIMIT);
    var pages = Math.max(1, Math.ceil(list.length / limit));
    var page = toPositiveInt(query.page, 1);
    return {
      items: list.slice((page - 1) * limit, page * limit),
      total: list.length,
      page: page,
      pages: pages,
    };
  }

  function toBody(result) {
    return {
      data: result.items.map(function (p) {
        return { id: p.id, title: p.title, category: p.category, priceMinor: p.price * 100, stock: p.stock };
      }),
      meta: { total: result.total, page: result.page, pages: result.pages },
    };
  }

  function abortError() {
    return new DOMException('The operation was aborted.', 'AbortError');
  }

  window.fetch = function (input, init) {
    var url = new URL(typeof input === 'string' ? input : input.url, 'https://shop.example');
    if (url.pathname !== '/api/products') return realFetch(input, init);

    var signal = init && init.signal;
    var query = Object.fromEntries(url.searchParams);
    server.calls.push(query);

    var failed = server.failNext > 0;
    if (failed) server.failNext -= 1;
    var delay = server.delayFor ? server.delayFor(query) : undefined;
    if (typeof delay !== 'number') delay = server.delayMs;

    return new Promise(function (resolve, reject) {
      if (signal && signal.aborted) {
        reject(abortError());
        return;
      }
      server.pending += 1;
      var timer = setTimeout(function () {
        timer = null;
        server.pending -= 1;
        var payload = failed ? { error: 'Service Unavailable' } : toBody(findProducts(query));
        resolve(new Response(JSON.stringify(payload), {
          status: failed ? 503 : 200,
          headers: { 'Content-Type': 'application/json' },
        }));
      }, delay);
      if (signal) {
        signal.addEventListener('abort', function () {
          if (timer === null) return;
          clearTimeout(timer);
          timer = null;
          server.pending -= 1;
          reject(abortError());
        });
      }
    });
  };
})();
