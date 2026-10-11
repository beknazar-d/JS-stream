## Контекст

Система мониторинга собирает первые строки ошибок из логов пользователей и группирует их по типу. Строки приходят в разном виде: с пробелами, с переводом строки, иногда без типа.

Примеры реальных первых строк:

```text
TypeError: Cannot read properties of undefined (reading 'replace')
ReferenceError: totl is not defined
SyntaxError: missing ) after argument list
```

## Цель

Допишите функцию `errorSummary(line)` в `index.js`. Она принимает первую строку сообщения об ошибке и возвращает объект `{ name, message }`: тип ошибки и её текст.

## Критерии приёмки

- `errorSummary("ReferenceError: totl is not defined")` возвращает `{ name: "ReferenceError", message: "totl is not defined" }`.
- Делить нужно по первому `": "`: `errorSummary("Error: Failed: timeout")` возвращает `{ name: "Error", message: "Failed: timeout" }`.
- Пробелы и перевод строки по краям строки не мешают.
- Если в строке нет `": "`, имя — `"Error"`, а текст — вся строка (без пробелов по краям).

## Ограничения

- Не используйте регулярные выражения.
- Менять только тело `errorSummary`.
