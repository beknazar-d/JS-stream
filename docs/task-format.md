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
вариант рядом), `Figure` (картинка или SVG с подписью, `alt` обязателен).

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
