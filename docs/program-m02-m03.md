# Программа модулей 2 и 3 (этап 3)

27 уроков, по 6 заданий. Сквозной контекст: интернет-магазин бытовой техники
«Домотека» — каталог, карточка товара, корзина, оформление заказа, панель
менеджера. В модуле 2 человек верстает его страницы, в модуле 3 оживляет их.

С модуля 3 часть заданий содержит неясности (поле `ambiguous` в task.md, раздел
«Неясности»): человек записывает вопросы и допущения в `assumptions.txt` до кода,
а в разборе эталона перечислены вопросы, которые стоило задать.

## Модуль 2. HTML и CSS (6 недель, 14 уроков)

| № | slug | Урок | Ключевое |
|---|---|---|---|
| 2.1 | l01-semantic-html | Семантическая разметка | header, nav, main, article, section, footer, заголовки по порядку, списки |
| 2.2 | l02-forms-html | Формы | form, label, input и типы, select, textarea, fieldset/legend, required |
| 2.3 | l03-selectors-cascade | Селекторы, каскад и специфичность | классы, комбинаторы, псевдоклассы, вес селектора, порядок, наследование |
| 2.4 | l04-box-model | Блочная модель | content/padding/border/margin, box-sizing, схлопывание отступов, display |
| 2.5 | l05-units-typography | Единицы и типографика | px, rem, em, %, vw, line-height, шрифты, max-width для текста |
| 2.6 | l06-flexbox | Flexbox | ось, justify/align, gap, wrap, flex: 1, порядок |
| 2.7 | l07-grid | Grid | колонки и строки, fr, repeat, minmax, auto-fill, области |
| 2.8 | l08-traps-css | Разбор ловушек CSS | специфичность, схлопывание отступов, flex-shrink, переполнение, z-index |
| 2.9 | l09-responsive | Адаптивная вёрстка | mobile-first, медиазапросы, clamp, адаптивные картинки |
| 2.10 | l10-css-variables | Переменные CSS и темы | custom properties, var(), тёмная тема, prefers-color-scheme |
| 2.11 | l11-transitions-animations | Переходы и анимации | transition, transform, @keyframes, prefers-reduced-motion |
| 2.12 | l12-accessibility | Доступность | контраст, фокус, alt, aria-label, порядок табуляции, скрытый текст |
| 2.13 | l13-css-architecture | Организация стилей | БЭМ, компоненты, @layer, отказ от !important |
| 2.14 | l14-project-pages | Проект P2: три страницы по макету | карточка товара, форма заказа, панель управления; макеты, чек-лист |

## Модуль 3. JavaScript в браузере (5 недель, 13 уроков)

| № | slug | Урок | Ключевое |
|---|---|---|---|
| 3.1 | l01-dom-basics | DOM: поиск и изменение | querySelector, textContent, classList, атрибуты, dataset |
| 3.2 | l02-render-lists | Создание элементов и списки | createElement, template, append, textContent против innerHTML, XSS |
| 3.3 | l03-events | События | addEventListener, объект события, preventDefault, removeEventListener |
| 3.4 | l04-delegation | Всплытие и делегирование | bubbling, target и currentTarget, closest, один обработчик на список |
| 3.5 | l05-forms-validation | Формы и валидация | FormData, submit, constraint validation, свои сообщения об ошибках |
| 3.6 | l06-fetch | fetch и JSON-API | fetch, response.ok, json(), async/await на базовом уровне |
| 3.7 | l07-loading-errors | Загрузка и ошибки сети | состояния loading/error/empty, повтор запроса, AbortController |
| 3.8 | l08-web-storage | Web Storage | localStorage, JSON, корзина между сессиями, ошибки разбора |
| 3.9 | l09-history-url | Адрес страницы и History API | URLSearchParams, pushState, popstate, фильтры в адресе |
| 3.10 | l10-intersection-observer | Intersection Observer | ленивая загрузка, бесконечная прокрутка |
| 3.11 | l11-debounce | Дебаунс и троттлинг | поиск при вводе, setTimeout, clearTimeout |
| 3.12 | l12-traps-browser | Разбор ловушек браузерного JS | this в обработчиках, утечки обработчиков, гонки ответов, innerHTML |
| 3.13 | l13-project-catalog | Проект P3: каталог по API | поиск, фильтры, сортировка, пагинация, изменение требований посередине |
