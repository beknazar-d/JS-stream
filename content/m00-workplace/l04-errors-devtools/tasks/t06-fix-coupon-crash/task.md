## Контекст

Тикет SHOP-1002 от поддержки: «Оформление заказа 1002 падает с ошибкой. Заказ 1001 с купоном считается нормально. У заказа 1002 купона нет».

Разработчик запустил расчёт у себя. Вот вывод (в проекте код лежит в `src/cart.js`, номера строк те же, что в вашем `index.js`):

```text
Заказ 1001: 1700
file:///home/anna/shop/src/cart.js:2
  return Number(text.replace("%", ""));
                     ^

TypeError: Cannot read properties of undefined (reading 'replace')
    at parsePercent (file:///home/anna/shop/src/cart.js:2:22)
    at discountFor (file:///home/anna/shop/src/cart.js:6:19)
    at totalWithCoupon (file:///home/anna/shop/src/cart.js:11:18)
    at file:///home/anna/shop/src/main.js:4:28
    at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
```

Читаем: ошибка в строке 2, функция `parsePercent`. В ней `text` равен `undefined`, ведь `replace` читают у «ничего». Цепочка снизу вверх: `main.js` вызвал `totalWithCoupon`, та вызвала `discountFor`, та — `parsePercent`. А `main.js` передал вторым аргументом `undefined`: у заказа 1002 купона нет.

## Цель

Исправьте код в `index.js`: функция `totalWithCoupon(price, couponText)` должна возвращать цену со скидкой. `couponText` — текст вроде `"15%"`, а у заказа без купона он может быть `undefined`, `null` или пустой строкой.

## Критерии приёмки

- `totalWithCoupon(2000, "15%")` возвращает `1700`.
- Без купона (`undefined`, `null`, `""`) возвращается полная цена: `totalWithCoupon(1500, undefined)` даёт `1500`.
- Пробелы вокруг купона не мешают: `totalWithCoupon(1000, " 10% ")` даёт `900`.
- Текст, который не получается превратить в число (`"abc"`), считается отсутствием скидки: итог равен цене, но не `NaN`.
- Функция никогда не падает с ошибкой и не возвращает `NaN`.

## Ограничения

- Имена функций и их порядок менять не нужно.
- Результат всегда число.
