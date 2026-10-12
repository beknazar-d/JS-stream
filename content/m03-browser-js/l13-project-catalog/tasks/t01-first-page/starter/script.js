const grid = document.querySelector('#grid');
const totalLine = document.querySelector('#total');

// Этап 1. Загрузите первую страницу каталога и покажите её.
//
// 1. GET /api/products?page=1&limit=6, ответ { items, total, page, pages }.
// 2. Для каждого товара создайте li.card с тремя частями:
//    h3.card__title (название), p.card__price (цена вида «2 990 ₽»),
//    p.card__stock («В наличии» или «Нет в наличии»).
//    У товара не в наличии добавьте li класс card--out.
// 3. В #total выведите «Найдено: N», где N — общее число товаров на сервере.
//
// Текст добавляйте через textContent, а не через innerHTML.
