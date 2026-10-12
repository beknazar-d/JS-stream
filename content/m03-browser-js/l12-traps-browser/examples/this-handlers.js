// Браузер вызывает обычную функцию-обработчик так, будто this — это элемент.
// Мы повторяем это через call: обработчик.call(элемент).
const button = { id: 'buy-7', label: 'В корзину' };

function makeHandlers() {
  return {
    regular: function () {
      return this.id;
    },
    arrow: () => this.id,
  };
}

// Стрелка запоминает this того места, где её записали (здесь — объект outer).
const handlers = makeHandlers.call({ id: 'outer' });

console.log('обычная функция:', handlers.regular.call(button));
console.log('стрелка:', handlers.arrow.call(button));
