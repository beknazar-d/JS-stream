# Runner

Раннеры заданий в браузере.

- `src/index.ts` — `runTask(bundle, files)` и `runSnippet(file, source)` для сайта.
- `src/compile-worker.ts` — постоянный Worker с компилятором TypeScript (грузится лениво).
- `src/exec-worker.ts` — одноразовый Worker исполнения: без IndexedDB, Cache, сети и
  вложенных Worker, уничтожается через 5 секунд.

Дальше: iframe с `sandbox` для HTML/CSS (этап 3) и WebContainer с локальным режимом для Node.js (этап 5).
