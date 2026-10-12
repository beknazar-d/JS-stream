// Управляемое время для тестов асинхронного кода: таймауты, повторы,
// дебаунс и интервалы проверяются без настоящего ожидания.
//
//   timers.useFake();                 // подменить setTimeout, setInterval, Date.now
//   startPolling();
//   await timers.advance(3000);       // прошло 3 секунды: сработали все таймеры
//   timers.useReal();                 // вернуть настоящие (делается и после каждого теста)

interface Timer {
  id: number;
  at: number;
  callback: (...args: unknown[]) => void;
  args: unknown[];
  interval?: number;
}

const realSetTimeout = globalThis.setTimeout;
const realClearTimeout = globalThis.clearTimeout;
const realSetInterval = globalThis.setInterval;
const realClearInterval = globalThis.clearInterval;
const RealDate = globalThis.Date;

// Даёт выполниться всем микрозадачам (then, await) до следующего таймера.
const flushMicrotasks = () => new Promise<void>((resolve) => realSetTimeout(resolve, 0));

export function createFakeTimers() {
  let fake = false;
  let now = 0;
  let nextId = 1;
  let timers: Timer[] = [];

  const schedule = (callback: unknown, delay: unknown, args: unknown[], interval: boolean) => {
    if (typeof callback !== 'function') throw new TypeError('Первым аргументом таймера должна быть функция');
    const ms = Math.max(0, Number(delay) || 0);
    const timer: Timer = { id: nextId++, at: now + ms, callback: callback as Timer['callback'], args, interval: interval ? Math.max(1, ms) : undefined };
    timers.push(timer);
    return timer.id;
  };
  const clear = (id: unknown) => {
    timers = timers.filter((t) => t.id !== id);
  };

  class FakeDate extends RealDate {
    constructor(...args: unknown[]) {
      if (args.length === 0) super(now);
      else super(...(args as [string]));
    }
    static now() {
      return now;
    }
  }

  const api = {
    // Включить управляемое время. Часы начинаются с start (по умолчанию 2025-01-01T00:00:00Z).
    useFake(start: number | string | Date = '2025-01-01T00:00:00Z') {
      now = new RealDate(start).getTime();
      timers = [];
      fake = true;
      Object.assign(globalThis, {
        setTimeout: (cb: unknown, ms?: unknown, ...args: unknown[]) => schedule(cb, ms, args, false),
        setInterval: (cb: unknown, ms?: unknown, ...args: unknown[]) => schedule(cb, ms, args, true),
        clearTimeout: clear,
        clearInterval: clear,
        Date: FakeDate,
      });
    },
    useReal() {
      if (!fake) return;
      fake = false;
      timers = [];
      Object.assign(globalThis, {
        setTimeout: realSetTimeout,
        setInterval: realSetInterval,
        clearTimeout: realClearTimeout,
        clearInterval: realClearInterval,
        Date: RealDate,
      });
    },
    // Сдвинуть часы на ms, выполняя по порядку все таймеры, срок которых наступил.
    async advance(ms: number) {
      if (!fake) throw new Error('Сначала включите управляемое время: timers.useFake()');
      const target = now + ms;
      await flushMicrotasks();
      for (;;) {
        const due = timers.filter((t) => t.at <= target).sort((a, b) => a.at - b.at || a.id - b.id)[0];
        if (!due) break;
        now = due.at;
        if (due.interval) due.at += due.interval;
        else clear(due.id);
        due.callback(...due.args);
        await flushMicrotasks();
      }
      now = target;
      await flushMicrotasks();
    },
    // Выполнить все отложенные таймеры (интервалы — не больше limit срабатываний).
    async runAll(limit = 1000) {
      for (let i = 0; i < limit && timers.length; i++) {
        const next = [...timers].sort((a, b) => a.at - b.at || a.id - b.id)[0];
        await api.advance(Math.max(0, next.at - now));
      }
    },
    // Сколько таймеров ещё ждёт своей очереди.
    pending: () => timers.length,
    now: () => now,
  };
  return api;
}
