// Worker исполнения кода человека. Создаётся заново на каждый запуск
// и уничтожается по таймауту. Перед запуском у кода отнимается доступ
// к хранилищам и сети: данные платформы (IndexedDB) ему недоступны.
import { execute, type ExecJob } from '@platform/tasks-kit/exec';

const send = self.postMessage.bind(self);

const BLOCKED = [
  'indexedDB',
  'caches',
  'fetch',
  'XMLHttpRequest',
  'WebSocket',
  'WebTransport',
  'EventSource',
  'importScripts',
  'Worker',
  'SharedWorker',
  'BroadcastChannel',
  'postMessage',
  'onmessage',
  'close',
];

function harden() {
  for (const name of BLOCKED) {
    let target: object | null = self;
    while (target) {
      const descriptor = Object.getOwnPropertyDescriptor(target, name);
      if (descriptor?.configurable) delete (target as Record<string, unknown>)[name];
      else if (descriptor) {
        try {
          (target as Record<string, unknown>)[name] = undefined;
        } catch {
          // свойство только для чтения: оставляем, проверка ниже
        }
      }
      target = Object.getPrototypeOf(target);
    }
  }
  // Хранилище файлов (OPFS) и прочие API через navigator.
  try {
    Object.defineProperty(Object.getPrototypeOf(navigator), 'storage', { get: () => undefined, configurable: false });
  } catch {
    // нет такого свойства в этом браузере
  }
}

self.addEventListener(
  'message',
  async (event: MessageEvent<ExecJob>) => {
    harden();
    try {
      send({ ok: true, result: await execute(event.data) });
    } catch (error) {
      send({ ok: false, message: error instanceof Error ? error.message : String(error) });
    }
  },
  { once: true },
);
