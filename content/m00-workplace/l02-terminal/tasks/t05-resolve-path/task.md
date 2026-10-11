## Контекст

Вы пишете учебный тренажёр терминала: пользователь вводит `cd путь`, а тренажёр показывает, в какой папке он окажется. Настоящий терминал упрощает пути: убирает `.`, обрабатывает `..`. Эту работу нужно повторить.

Примеры из реального терминала (bash, вы стоите в `/home/anna/shop`):

```text
anna@vm:~/shop$ cd src
anna@vm:~/shop/src$ pwd
/home/anna/shop/src
anna@vm:~/shop/src$ cd ../docs/..
anna@vm:~/shop$ pwd
/home/anna/shop
anna@vm:~/shop$ cd /home/anna/shop/src/../docs
anna@vm:~/shop/docs$ pwd
/home/anna/shop/docs
```

## Цель

Допишите функцию `resolvePath(cwd, target)` в `index.js`. Она принимает текущую папку `cwd` (абсолютный путь вида `/home/anna/shop` или `/`) и путь `target` из команды `cd`. Возвращает итоговый абсолютный путь без `.`, `..` и лишних косых черт.

## Критерии приёмки

- Обычный относительный путь добавляется к текущей папке: `resolvePath("/home/anna/shop", "src")` возвращает `"/home/anna/shop/src"`.
- Две точки поднимают на уровень выше: `resolvePath("/home/anna/shop/src", "..")` возвращает `"/home/anna/shop"`, а `resolvePath("/home/anna/shop/src", "../docs")` — `"/home/anna/shop/docs"`.
- Одна точка ничего не меняет: `resolvePath("/home/anna/shop", ".")` возвращает `"/home/anna/shop"`.
- Абсолютный `target` заменяет текущую папку: `resolvePath("/home/anna/shop", "/tmp")` возвращает `"/tmp"`.
- Выше корня подняться нельзя: `resolvePath("/home", "../../..")` возвращает `"/"`.
- Двойные косые черты и косая черта в конце игнорируются: `resolvePath("/home/anna/", "shop//src/")` возвращает `"/home/anna/shop/src"`.
- Результат корня — одна косая черта `"/"`.

## Ограничения

- Только пути в стиле macOS и Linux (с `/`). Windows в этом задании не поддерживается.
- Не используйте регулярные выражения и методы работы с путями Node.js.
- Менять только тело `resolvePath`.
