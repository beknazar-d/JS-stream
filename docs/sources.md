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
