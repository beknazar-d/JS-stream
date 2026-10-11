# Tasks Kit

Формат задания и его проверка. Один и тот же код работает в браузере (Web Worker) и в CI (worker_threads).

- `src/meta.ts` — схема `meta.yaml`, `lesson.yaml`, `module.yaml`, `cards.yaml` и проверка.
- `src/test-api.ts` — `describe`, `it`, `expect` в стиле Vitest с сообщениями на русском.
- `src/compile.ts` — JS и TS → CommonJS через компилятор TypeScript.
- `src/exec.ts` — исполнение кода и тестов, перехват `console`.
- `src/evaluate.ts` — проверка решения задания целиком, отчёт для человека.
- `src/explain.ts` — объяснения типичных ошибок человеческим языком.
- `node/` — загрузка контента с диска и пул worker_threads с лимитом времени.
- `scripts/verify.ts` — `npm run verify`.

Формат контента описан в `/docs/task-format.md`.
