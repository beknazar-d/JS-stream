// api.js: учебный «сервер» Домотеки (версия API: 1). Файл менять не нужно.
// Он подменяет fetch для адреса /api/products и отвечает как настоящий сервер:
// с задержкой, с фильтрами и страницами, иногда с ошибкой.
//
// Запрос: GET /api/products?page=1&limit=6
// Параметры: page, limit (по умолчанию 12, не больше 24), q (поиск по названию).
// Ответ 200: { items: [{ id, title, category, price, inStock }], total, page, pages }
//   price в рублях, inStock — true или false.
// Ответ 503: { error: "Service Unavailable" }.
//
// Для проверок: window.shopServer (calls, delayMs, delayFor, failNext, catalog, pending).
(function () {
  var API_VERSION = 1;
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
      items: result.items.map(function (p) {
        return { id: p.id, title: p.title, category: p.category, price: p.price, inStock: p.stock > 0 };
      }),
      total: result.total,
      page: result.page,
      pages: result.pages,
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
