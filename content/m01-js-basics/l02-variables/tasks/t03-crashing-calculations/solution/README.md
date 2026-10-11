# Разбор

Три ошибки, три причины.

1. `Assignment to constant variable.` В `stockAfterSale` переменную `left` меняют, но объявили через `const`. Значение должно меняться, поэтому нужен `let`.
2. `Cannot access 'vat' before initialization.` В `priceWithVat` сумму считают в строке выше, чем объявлена `vat`. Объявление надо поднять выше строки, где переменную читают. Заодно цену превращаем в число через `Number(price)`: цена из формы приходит строкой, а плюс со строкой склеивает.
3. `lable is not defined.` В `shippingLabel` объявлена `label`, а возвращается `lable`. Опечатка в имени.

Сообщение об ошибке уже говорит, в чём дело: `constant` — про `const`, `before initialization` — про порядок строк, `is not defined` — про имя, которого нет.
