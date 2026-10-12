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

## Модуль 2, уроки 2.12–2.14 «Доступность», «Организация стилей», «Проект P2: три страницы по макету»

Тексты, примеры и задания написаны с нуля, со своими данными (магазин «Домотека»). Прямых заимствований нет.

| Источник | Что использовано | Лицензия |
| --- | --- | --- |
| [WCAG 2.1 (W3C): 1.1.1, 1.4.3, 1.4.11, 2.4.3, 2.4.7, 4.1.2](https://www.w3.org/TR/WCAG21/) | Пороги контраста 4,5 : 1, 3 : 1 и определение крупного текста (18pt, 14pt жирным), формула относительной яркости и контраста (в тексте 2.1 порог канала 0,03928; в sRGB 0,04045, для 8-битных цветов результат совпадает) | W3C Document License (только факты) |
| [MDN Web Docs: :focus-visible, @layer, cascade layers, ARIA, table, aria-label](https://developer.mozilla.org/ru/docs/Web) | Поведение `:focus-visible`, порядок слоёв, `!important` в слоях, правила для `scope` и `caption`. Текст не копировался | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |
| [Using ARIA (W3C): First Rule of ARIA Use](https://www.w3.org/TR/using-aria/) | Идея «не используй ARIA, если хватает HTML» | W3C Document License (только идея) |
| [БЭМ (ru.bem.info): методология именования](https://ru.bem.info/methodology/) | Идея блок, элемент, модификатор; примеры написаны свои | Только идея |
| [GitHub Docs: Configuring a publishing source for GitHub Pages](https://docs.github.com/pages) | Шаги публикации: Settings, Pages, Deploy from a branch | Только факты |

Поведение Chromium проверено запуском через playwright: порядок слоёв при `!important` обратный, правило вне слоя сильнее любого слоя, `:focus-visible` срабатывает при программном `focus()`, сообщение консоли `Failed to load resource: the server responded with a status of 404 (Not Found)`. Сообщения V8 (`Cannot read properties of null (reading 'focus')`, `Cannot convert undefined or null to object`) и Git (`fatal: not a git repository`) получены запуском. Страницы GitHub Pages и WCAG на w3.org в среде недоступны: шаги публикации и формула сверены по документации и поиску, а не по прямому чтению спецификации.

## Модуль 3, уроки 3.8–3.10 «Web Storage», «Адрес страницы и History API», «Intersection Observer»

Тексты, примеры и задания написаны с нуля, со своими данными («Домотека»). Прямых заимствований нет.

| Источник | Что использовано | Лицензия |
| --- | --- | --- |
| [MDN Web Docs: Web Storage API, Storage.setItem и getItem, JSON.parse и JSON.stringify](https://developer.mozilla.org/ru/docs/Web/API/Web_Storage_API) | Поведение хранилища (только строки, `null` для отсутствующего ключа), лимит объёма. Использованы только факты, текст не копировался | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |
| [MDN Web Docs: URL, URLSearchParams, History API (pushState, replaceState, popstate)](https://developer.mozilla.org/ru/docs/Web/API/History_API) | Методы и события, формат `URLSearchParams`. Использованы только факты | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |
| [MDN Web Docs: Intersection Observer API](https://developer.mozilla.org/ru/docs/Web/API/Intersection_Observer_API) | Параметры `rootMargin` и `threshold`, поля записи, первое уведомление после `observe`. Использованы только факты | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |

Поведение Chromium проверено запуском через playwright: тексты ошибок `QuotaExceededError`, `SecurityError` и `DataCloneError` у `pushState`, `SyntaxError`, `RangeError` и `TypeError` у конструктора `IntersectionObserver`, первое уведомление `isIntersecting: false` после `observe`, повторное уведомление после `unobserve` и `observe`, отсутствие срабатывания настоящего `IntersectionObserver` в скрытом iframe вне экрана. Сообщения `JSON.parse` и `new URL` получены запуском в Node.js 22.

## Модуль 3, уроки 3.1–3.4 «DOM: поиск и изменение», «Создание элементов и списки», «События», «Всплытие и делегирование»

Тексты, примеры и задания написаны с нуля, со своими данными (магазин «Домотека»). Прямых заимствований нет.

| Источник | Что использовано | Лицензия |
| --- | --- | --- |
| [MDN Web Docs: Document Object Model, `querySelector`, `Element.classList`, `HTMLElement.dataset`, `hidden`, `Node.append`, `replaceChildren`, `HTMLTemplateElement`, `Element.innerHTML` (Security considerations), `addEventListener`, `Event`, `Event.preventDefault`, Event bubbling, `Element.closest`](https://developer.mozilla.org/ru/docs/Web/API) | Названия и поведение методов, правила `dataset` (kebab-case в camelCase), порядок всплытия, список событий, которые не всплывают. Текст не копировался | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |
| [HTML Living Standard (WHATWG)](https://html.spec.whatwg.org/) | Атрибут `hidden` работает по наличию, `script` из `innerHTML` не выполняется, `template.content` как `DocumentFragment` | CC BY 4.0 (только факты) |
| [OWASP: Cross Site Scripting Prevention](https://cheatsheetseries.owasp.org/) | Идея: данные пользователя вставлять как текст, не как разметку | CC BY-SA 4.0 (только идея, текст не использован) |

Сообщения в разделах «Типичные ошибки» (`Cannot read properties of null`, `Failed to execute 'querySelector'`, `Failed to execute 'addEventListener'`, `Failed to execute 'appendChild'`, `InvalidCharacterError` у `classList.add`), поведение `append(null)`, `hidden = 'false'`, `dataset` и вывод `Intl.NumberFormat('ru-RU')` получены запуском в Chromium (playwright). Не проверялось на других браузерах.

## Модуль 3, уроки 3.5–3.7 «Формы и валидация», «fetch и JSON-API», «Загрузка и ошибки сети»

Тексты, примеры и задания написаны с нуля, со своими данными (магазин «Домотека»). Прямых заимствований нет.

| Источник | Что использовано | Лицензия |
| --- | --- | --- |
| [MDN Web Docs: `FormData`, Constraint validation, `ValidityState`, `setCustomValidity`, `Fetch API`, `Response.ok`, `AbortController`, `AbortSignal`, `ARIA live regions`, `aria-invalid`, `aria-describedby`, `aria-busy`](https://developer.mozilla.org/ru/docs/Web/API) | Названия и поведение методов и флагов, правила `FormData`, `ok` для 200–299, `fetch` не отклоняется на 404 и 500. Текст не копировался | CC BY-SA 2.5 (атрибуция «Mozilla Contributors») |
| [HTML Living Standard (WHATWG)](https://html.spec.whatwg.org/) | `minlength`, `maxlength` действуют только при вводе пользователем, `pattern` проверяет значение целиком, `novalidate` | CC BY 4.0 (только факты) |

Тексты ошибок в «Типичных ошибках» (`Failed to construct 'FormData'`, `An invalid form control ... is not focusable`, `Form submission canceled because the form is not connected`, `Failed to fetch`, `Unexpected token '<'`, `body stream already read`, `signal is aborted without reason`) получены запуском в Chromium (playwright), сообщения `await is only valid...` и `Cannot read properties of null` — в Node.js 22. Firefox и Safari не проверялись.
