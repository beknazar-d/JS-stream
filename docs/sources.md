# Источники

Реестр источников: что взято, откуда и под какой лицензией. Правила — в `/CLAUDE.md`.

## Модуль 1, урок 1 «Значения, типы и преобразования типов»

Тексты, примеры и задания написаны с нуля, со своими данными. Прямых заимствований нет.

| Источник | Что использовано | Лицензия |
| --- | --- | --- |
| [MDN Web Docs: Data types and data structures, Type coercion, Equality comparisons](https://developer.mozilla.org/ru/docs/Web/JavaScript) | Перечень типов, правила работы `+`, `Number()`, `NaN`, `==` и `===`. Использованы только факты и порядок тем, текст не копировался | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |
| [The Odin Project: JavaScript Basics](https://www.theodinproject.com/) | Идея формата «описание, заготовка, тесты» для разминок | CC BY-NC-SA 4.0 (только идея формата, материалы не использованы) |
| [Exercism: JavaScript track](https://exercism.org/tracks/javascript) | Идея небольших заданий с тестами | MIT (только идея) |

Сообщения консоли в разделе «Типичные ошибки» и результаты выражений получены запуском в Node.js 22.22.0 (движок V8).

## Модуль 1, уроки 2–5 «Переменные», «Операторы», «Условия», «Строки»

Тексты, примеры и задания написаны с нуля, со своими данными. Прямых заимствований нет.

| Источник | Что использовано | Лицензия |
| --- | --- | --- |
| [MDN Web Docs: let, const, Expressions and operators, Control flow, String](https://developer.mozilla.org/ru/docs/Web/JavaScript) | Факты о поведении `let`/`const`, приоритете операторов, `??`, `switch`, методах строк. Текст не копировался | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |

Сообщения консоли и результаты выражений получены запуском в Node.js 22.22.0 (V8).

## Модуль 1, уроки 6–9 «Циклы», «Функции», «Область видимости и стрелочные функции», «Разбор ловушек»

Тексты, примеры и задания написаны с нуля, со своими данными. Прямых заимствований нет.

| Источник | Что использовано | Лицензия |
| --- | --- | --- |
| [MDN Web Docs: for, while, do...while, break, continue, Functions, Arrow functions, Closures, Equality comparisons, Nullish coalescing, Lexical grammar (ASI), let (TDZ)](https://developer.mozilla.org/ru/docs/Web/JavaScript) | Факты о поведении конструкций и порядок тем. Текст не копировался | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |

Сообщения консоли и результаты выражений получены запуском в Node.js 22.22.0 (V8).

## Модуль 0 «Рабочее место», уроки 0.1–0.4

Тексты, примеры и задания написаны с нуля, со своими данными. Прямых заимствований нет.

| Источник | Что использовано | Лицензия |
| --- | --- | --- |
| [Node.js: документация и страница загрузки](https://nodejs.org/) | Версии LTS, команды `node -v`, `npm -v`, `node файл.js` | MIT (только факты) |
| [MDN Web Docs: Chrome DevTools, Console API, Error](https://developer.mozilla.org/ru/docs/Web/JavaScript) | Типы ошибок, методы `console`, оператор `debugger`. Текст не копировался | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |
| [Pro Git](https://git-scm.com/book/ru/v2) и документация Git | Порядок команд init, add, commit, log, формат `git status --short` | CC BY-NC-SA 3.0 (только порядок тем, текст не копировался) |
| [Chrome DevTools: Sources и горячие клавиши](https://developer.chrome.com/docs/devtools) | Клавиши F8, F10, F11, Shift+F11 | Только факты |

Вывод терминала, Git и стектрейсы получены запуском команд в Node.js 22.22.0 и Git 2.43.0 (Linux, bash). Исключения, не проверенные запуском: поведение PowerShell и cmd на Windows, формат стектрейса с путём Windows (используется только в скрытом тесте), клавиши DevTools.

## Модуль 1, уроки 14–18 «Деструктуризация, spread и rest», «Ошибки», «ES-модули и JSON», «Даты и время», «Проект P1»

Тексты, примеры и задания написаны с нуля, со своими данными. Прямых заимствований нет.

| Источник | Что использовано | Лицензия |
| --- | --- | --- |
| [MDN Web Docs: Destructuring, Spread syntax, Rest parameters, Error, try...catch, JavaScript modules, JSON, Date, Intl.DateTimeFormat](https://developer.mozilla.org/ru/docs/Web/JavaScript) | Перечень возможностей и поведение (месяцы в Date с нуля, `JSON.stringify` пропускает `undefined`, значения по умолчанию только для `undefined`). Использованы только факты и порядок тем, текст не копировался | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |
| [The Odin Project](https://www.theodinproject.com/), [Exercism: JavaScript track](https://exercism.org/tracks/javascript) | Идея формата «ТЗ, этапы, тесты» для мини-проекта | CC BY-NC-SA 4.0 и MIT (только идея, материалы не использованы) |

Сообщения консоли в разделах «Типичные ошибки», формат вывода `Intl.DateTimeFormat('ru-RU')` и сообщения `JSON.parse` получены запуском в Node.js 22.22.0 (движок V8).

## Модуль 2, уроки 2.5–2.8 «Единицы и типографика», «Flexbox», «Grid», «Разбор ловушек CSS»

Идеи и факты сверялись с MDN (Mozilla Contributors, CC-BY-SA 2.5): CSS values and units, Flexbox, Grid, `flex` shorthand, `auto-fill` и `auto-fit`, Mastering margin collapsing, Understanding z-index, CSS specificity, `overflow-wrap`, `text-overflow`. Тексты, примеры и задания написаны с нуля на своих данных («Домотека»). Порядок фокуса и `order`: WCAG 2.1, критерий 1.3.2 и 2.4.3.

## Модуль 2, уроки 2.9–2.11 «Адаптивная вёрстка», «Переменные CSS и темы», «Переходы и анимации»

Тексты, примеры и задания написаны с нуля, со своими данными. Прямых заимствований нет.

| Источник | Что использовано | Лицензия |
| --- | --- | --- |
| [MDN Web Docs: CSS media queries, viewport meta, clamp(), srcset и sizes, custom properties и var(), prefers-color-scheme, transition, @keyframes, prefers-reduced-motion](https://developer.mozilla.org/ru/docs/Web/CSS) | Синтаксис и поведение. Использованы только факты, текст не копировался | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |
| [WCAG 2.1: 1.4.3 Contrast, 2.3.3 Animation from Interactions](https://www.w3.org/TR/WCAG21/) | Порог контраста 4.5 : 1 и формула яркости; идея учитывать настройку уменьшения движения | W3C Document License (только факты) |
| [web.dev: Stick to compositor-only properties](https://web.dev/articles/stick-to-compositor-only-properties-and-manage-layer-count) | Идея, что transform и opacity дёшевы для анимации | CC BY 4.0 (только идея) |

Поведение Chromium (viewport без метатега даёт ширину 980 px, медиазапрос без единицы и var() в условии не срабатывают, var(--gap)px сбрасывает свойство, запасное значение var() принимает запятые) проверено запуском в Chromium через playwright.

## Модуль 2, уроки 2.1–2.4 «Семантическая разметка», «Формы», «Селекторы, каскад и специфичность», «Блочная модель»

Тексты, примеры и задания написаны с нуля, со своими данными (магазин «Домотека»). Прямых заимствований нет.

| Источник | Что использовано | Лицензия |
| --- | --- | --- |
| [MDN Web Docs: HTML elements, Constraint validation, Cascade and inheritance, Specificity, Box model, Mastering margin collapsing](https://developer.mozilla.org/ru/docs/Web) | Список тегов и атрибутов, правила подсчёта специфичности, схлопывание отступов, значения `autocomplete`. Текст не копировался | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |
| [HTML Living Standard (WHATWG)](https://html.spec.whatwg.org/) | Правила отправки формы (поля без `name` и выключенные не отправляются), токены `autocomplete` | CC BY 4.0 (только факты) |

Значения DOM и сообщения (`tabIndex`, `type` при неверном значении, `labels.length`, ширины `offsetWidth`, `SyntaxError` у `querySelector`) получены запуском в Chromium (playwright). Не проверялось на других браузерах.
