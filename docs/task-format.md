# Формат контента: модуль, урок, задание

Проверка всего контента: `npm run verify` (или `npm run verify -- m01` для части).

## Модуль

```
content/m01-js-basics/
  module.yaml        # number, title, summary, weeks
  l01-<slug>/        # уроки, порядок задаётся lesson.yaml → order
```

## Урок

```
l01-<slug>/
  lesson.yaml        # order, title, summary
  lesson.mdx         # текст урока
  cards.yaml         # карточки повторения (шпаргалка)
  examples/          # живые примеры: name.js и, по желанию, name.out.txt (ожидаемый вывод)
  tasks/<task-slug>/ # задания
```

`lesson.mdx` содержит заголовки второго уровня строго в таком порядке (заголовок может продолжаться после этих слов):

1. `## Зачем это в работе`
2. `## Объяснение` (простыми словами, одна аналогия)
3. `## Пример` (живой пример: `<Playground example="name" />`)
4. `## Как это работает` (схема или пошаговый визуализатор)
5. `## Типичные ошибки` (реальные сообщения консоли)
6. `## Шпаргалка` (`<Cheatsheet />` выводит cards.yaml)
7. `## Задания` (`<TaskList />` выводит задания урока)
8. `## Итог` (и мостик к следующему уроку)

В MDX доступны компоненты: `Playground` (редактор с запуском примера из `examples/`),
`Cheatsheet`, `TaskList`, `Note` (врезка), `Wrong` и `Right` (неправильный и правильный
вариант рядом), `Figure` (картинка или SVG с подписью, `alt` обязателен),
`Checklist` (практика на своём компьютере: терминал, Git, проект; отметки сохраняются
в прогрессе, но заданием не считаются):

```mdx
<Checklist id="first-commit" items={["Создать папку проекта", "Выполнить git init"]} />
```

Примеры из `examples/` запускаются в CI. Если рядом лежит `name.out.txt`, вывод
`console.log` сравнивается с ним построчно. Значения, отличные от строк, выводятся
в виде `[1, 2]`, `{ id: 1 }`, строки внутри массивов — в двойных кавычках.

`cards.yaml`:

```yaml
- id: arrays-map          # уникален в уроке
  front: Как получить новый массив, применив функцию к каждому элементу?
  back: "items.map((item) => ...)"
  answer: map             # необязательно: карточка проверяется вводом ответа
```

## Задание

```
tasks/t01-<slug>/
  task.md            # разделы: ## Контекст, ## Цель, ## Критерии приёмки, ## Ограничения
  meta.yaml
  starter/index.js   # заготовка; имена файлов = файлы, которые редактирует человек
  tests/
    public.test.js   # открытые тесты, человек их видит
    hidden.test.js   # скрытые тесты (обязательны для implement, fix-bug, refactor)
    snippet.js       # вспомогательные файлы, если нужны (например, код для predict)
  solution/
    index.js         # эталон
    README.md        # разбор эталона
  wrong/
    <name>/index.js  # три неверных решения, у каждого своя папка
```

`meta.yaml`:

```yaml
order: 1                 # порядок в уроке
title: Сумма заказа
type: implement          # recall | predict | fix-bug | implement | refactor | write-tests
role: warmup             # warmup (разминка) | main (основное) | real (реальная задача)
difficulty: 2            # 1–5
minutes: 10
language: js             # js | ts
tags: [массивы, reduce]
show: [tests/snippet.js] # необязательно: файлы, которые показываются под описанием
hints:
  - Направление: ...
  - Шаг: ...
  - Почти решение: ...
wrong:
  - name: no-empty-cart
    kind: edge-case      # partial | race | edge-case | common-mistake
    explanation: Почему это решение неверно (показывается после эталона).
  - ...                  # ровно три
```

Виды неверных решений: частичное (`partial`), с гонкой (`race`), без краевого
случая (`edge-case`). Пока в модуле нет асинхронности, гонку заменяет типичная
ошибка (`common-mistake`).

### Тесты

API в стиле Vitest, глобальные функции без импорта: `describe`, `it`/`test`,
`beforeEach`, `afterEach`, `expect`, `fn` (мок-функция), `runSnippet`.
Код человека импортируется как обычный модуль: `import { total } from './index.js'`.

Матчеры: `toBe`, `toEqual`, `toStrictEqual`, `toBeCloseTo`, `toBeTruthy`, `toBeFalsy`,
`toBeNull`, `toBeUndefined`, `toBeDefined`, `toBeNaN`, `toBeTypeOf`, `toBeInstanceOf`,
`toBeGreaterThan(OrEqual)`, `toBeLessThan(OrEqual)`, `toContain`, `toContainEqual`,
`toHaveLength`, `toHaveProperty`, `toMatch`, `toMatchObject`, `toThrow`,
`toHaveBeenCalled`, `toHaveBeenCalledTimes`, `toHaveBeenCalledWith`; модификаторы
`.not`, `.resolves`, `.rejects`.

Второй аргумент `expect(значение, 'пояснение')` добавляется к сообщению об ошибке.
Пишите его так, чтобы было понятно, какой случай проверяется:
`expect(total([]), 'Сумма пустой корзины').toBe(0)`.

### Типы заданий

- **implement, fix-bug, refactor, recall** — человек правит `starter/`, тесты проверяют поведение.
- **predict** — в `tests/snippet.js` код, который нужно прочитать (указать в `show`).
  Заготовка: `starter/answer.js` с `export const output = [];`. Тест сравнивает
  `output` с `runSnippet('snippet.js')` — строками, которые реально выводит код.
- **write-tests** — человек пишет `starter/index.test.js`. Проверяемый код лежит в
  `subject/index.js` (указать в `show`), версии с ошибками — в `mutants/<name>/index.js`
  и описаны в `meta.yaml → mutants: [{ name, description }]`. Тесты человека должны
  проходить на `subject` и падать на каждом мутанте.

### Что проверяет `npm run verify`

- Метаданные модуля, урока, задания и карточки корректны.
- В уроке все восемь разделов, не меньше шести заданий: 3 разминки, 2 основных, 1 реальная.
- Примеры из `examples/` запускаются и выводят ожидаемое.
- Эталон проходит все тесты; заготовка не проходит; каждое из трёх неверных решений не проходит.
- Для write-tests: эталонные тесты ловят всех мутантов, неверные — нет.

Код выполняется с лимитом 5 секунд на прогон и 2 секунды на асинхронный тест.

## Задания на страницу: HTML, CSS, DOM (`language: html`)

Для модулей 2–3. Человек правит файлы страницы, тесты выполняются прямо внутри неё
(в iframe с `sandbox`, у страницы чужой источник и нет доступа к данным платформы).

```
tasks/t03-<slug>/
  task.md
  meta.yaml          # language: html; type: layout | implement | fix-bug | refactor | api | recall
  mockup.svg         # необязательно: макет (svg или png), показывается под описанием
  starter/
    index.html       # <link rel="stylesheet" href="styles.css">, <script src="script.js"></script>
    styles.css
    script.js        # если нужен
  tests/
    public.test.js
    hidden.test.js
    api.mock.json    # необязательно: мок API и начальный localStorage
  solution/ index.html, styles.css, script.js, README.md
  wrong/<name>/      # те же файлы, что в starter (подставляются поверх заготовки)
```

`<link>` и `<script src>` на файлы задания встраиваются в страницу. Страница открывается
шириной 1024×768. Тесты начинаются после события `load`.

Хелперы в тестах (глобальные, как `describe` и `expect`):

| Хелпер | Что делает |
|---|---|
| `$(sel)`, `$$(sel)` | `querySelector`, массив из `querySelectorAll` |
| `css(sel или элемент, 'свойство')` | вычисленное значение: `css('.card', 'display')` → `"flex"` |
| `box(sel)` | `{ x, y, top, left, right, bottom, width, height }`, округлено до px |
| `await viewport(375)` | меняет ширину окна (проверка адаптивности); верните `viewport(1024)` в конце теста |
| `await click(sel)`, `await type(sel, 'текст')`, `await submit('form')`, `await press(sel, 'Enter')` | действия пользователя; `type` вызывает события `input` и `change` |
| `await waitFor(() => условие, мс)` | ждёт, пока условие станет истинным (загрузка данных) |
| `await wait(мс)` | пауза (дебаунс, анимации) |
| `labelOf(sel)` | доступное имя: `aria-label`, `label`, `alt` или текст |
| `api().calls` | журнал запросов к мок-API: `{ method, path, query, body }` |
| `currentUrl()` | адрес после `history.pushState/replaceState`: `"/catalog?page=2"` |

Правила тестов вёрстки:

- Проверяйте результат, а не способ: «карточки стоят в три колонки» — через `box()` трёх
  карточек (одинаковый `top`, разный `left`), а не через `display: grid`. Тогда засчитаются и
  Flexbox, и Grid. Свойство проверяйте напрямую, только если урок про него («добавьте
  `box-sizing: border-box`»).
- Шрифты в разных системах разные: не проверяйте точную высоту текста и ширину по
  тексту. Ширины и отступы, заданные в CSS, проверяйте с допуском: `toBeCloseTo` или
  `Math.abs(a - b) <= 2`.
- Доступность — тоже критерий: `alt`, `label`, порядок заголовков, `button` вместо `div`.

`api.mock.json`:

```json
{
  "routes": [
    { "method": "GET", "path": "/api/products", "body": [{ "id": 1, "title": "Чайник" }], "delayMs": 300 },
    { "method": "GET", "path": "/api/stock", "responses": [{ "status": 503 }, { "status": 200, "body": { "left": 3 } }] }
  ],
  "storage": { "cart": "[]" }
}
```

`responses` — ответы по очереди (нестабильный API), последний повторяется. Неизвестный
путь отвечает 404. `fetch` поддерживает `AbortController`. Адрес в коде страницы —
относительный: `fetch('/api/products?page=2')`.

Ограничения страницы в sandbox (заменители работают как настоящие API):

- `localStorage` и `sessionStorage` хранятся в памяти страницы;
- `history.pushState/replaceState/back` работают и вызывают `popstate`, но `location`
  не меняется — читайте адрес через функцию, которая принимает строку адреса, а в
  задании передавайте её из `history.state` или из хелпера `currentUrl()` в тестах;
- cookies недоступны;
- бесконечный цикл в скрипте страницы прерывается через 1 секунду с понятной ошибкой.

## Асинхронный вывод (`runSnippetAsync`)

Для предсказания порядка вывода с промисами и таймерами: `await runSnippetAsync('snippet.js', 100)`
запускает файл, ждёт 100 мс настоящего времени и возвращает строки вывода по порядку.

## Управляемое время в тестах (`timers`)

Для заданий на таймауты, повторы, дебаунс и интервалы (модуль 4). Тест не ждёт по-настоящему:

```js
it('повтор через 1 и 2 секунды', async () => {
  timers.useFake();                 // подменяет setTimeout, setInterval, clearTimeout, Date
  const result = withRetry(load, 3, 1000);
  await timers.advance(1000);       // сдвинуть часы и выполнить наступившие таймеры
  expect(calls).toBe(2);
  await timers.runAll();            // выполнить все оставшиеся таймеры
  await expect(result).resolves.toBe('ok');
});
```

`timers.useFake(start)` — часы стартуют с `2025-01-01T00:00:00Z` (или с `start`);
`timers.advance(ms)` и `timers.runAll()` асинхронные — их нужно ждать через `await`;
`timers.pending()` — сколько таймеров ждёт; `timers.now()` — текущее время. После каждого
теста настоящие таймеры возвращаются сами.

## Проверка типов (`typecheck: true`, модуль 5)

В `meta.yaml` задания на TypeScript (`language: ts`) укажите `typecheck: true`. Тогда:

- файлы человека проверяются компилятором в режиме `strict` (target ES2022, без DOM);
  каждая ошибка типов — проваленная проверка «Типы в index.ts без ошибок (strict)»
  с кодом `TS2322` и сообщением компилятора;
- файлы `tests/*.types.ts` — тесты уровня типов, каждый файл — одна проверка.
  Доступны помощники `Expect<T>`, `ExpectFalse<T>`, `Equal<A, B>`, `NotEqual<A, B>`:

```ts
// tests/order.types.ts
import type { Order, OrderStatus } from './index.js';

type cases = [
  Expect<Equal<Order['status'], OrderStatus>>,
  Expect<Equal<OrderStatus, 'new' | 'paid' | 'shipped'>>,
];

// Ожидаемая ошибка — тоже проверка:
// @ts-expect-error статус «payed» не входит в OrderStatus
const wrong: Order = { id: 1, status: 'payed' };
```

Импорт из файлов человека в тестах — как в обычных тестах: `'./index.js'`. Обычные
тесты `*.test.ts` при этом тоже запускаются и проверяют поведение.
