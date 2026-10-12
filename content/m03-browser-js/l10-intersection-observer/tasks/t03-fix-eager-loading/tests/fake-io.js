// Заглушка IntersectionObserver для тестов тренажёра.
// Страница в тренажёре лежит вне экрана, поэтому настоящий наблюдатель не
// срабатывает. Заглушка ведёт себя так же, как браузер: проверяет аргументы,
// запоминает наблюдаемые элементы и вызывает колбэк только по команде теста.
const MARGIN = /^\s*-?\d+(\.\d+)?(px|%)(\s+-?\d+(\.\d+)?(px|%)){0,3}\s*$/;

export function installFakeObserver() {
  const original = window.IntersectionObserver;
  const instances = [];

  class FakeObserver {
    constructor(callback, options = {}) {
      if (typeof callback !== 'function') {
        throw new TypeError("Failed to construct 'IntersectionObserver': parameter 1 is not of type 'Function'.");
      }
      if (options.rootMargin !== undefined && options.rootMargin !== '' && !MARGIN.test(String(options.rootMargin))) {
        throw new DOMException("Failed to construct 'IntersectionObserver': rootMargin must be specified in pixels or percent.", 'SyntaxError');
      }
      this.callback = callback;
      this.options = options;
      this.targets = new Set();
      this.disconnected = false;
      instances.push(this);
    }
    observe(element) {
      if (!(element instanceof Element)) {
        throw new TypeError("Failed to execute 'observe' on 'IntersectionObserver': parameter 1 is not of type 'Element'.");
      }
      this.targets.add(element);
    }
    unobserve(element) {
      this.targets.delete(element);
    }
    disconnect() {
      this.targets.clear();
      this.disconnected = true;
    }
    takeRecords() {
      return [];
    }
  }

  window.IntersectionObserver = FakeObserver;

  const entryFor = (target, isIntersecting) => ({
    target,
    isIntersecting,
    intersectionRatio: isIntersecting ? 0.2 : 0,
    time: performance.now(),
    boundingClientRect: target.getBoundingClientRect(),
  });
  const toList = (elements) => (Array.isArray(elements) ? elements : [elements]);

  return {
    instances,
    // Все элементы, за которыми сейчас следят наблюдатели.
    observed: () => instances.flatMap((observer) => [...observer.targets]),
    // Как браузер: сообщает только о тех элементах, за которыми следят.
    fire(elements, isIntersecting = true) {
      const list = toList(elements);
      for (const observer of instances) {
        const own = list.filter((element) => observer.targets.has(element));
        if (own.length) observer.callback(own.map((element) => entryFor(element, isIntersecting)), observer);
      }
    },
    // Вызов колбэка без проверки наблюдения: запоздавшее уведомление.
    fireAnyway(elements, isIntersecting = true) {
      const list = toList(elements);
      for (const observer of instances) {
        observer.callback(list.map((element) => entryFor(element, isIntersecting)), observer);
      }
    },
    restore() {
      window.IntersectionObserver = original;
    },
  };
}
