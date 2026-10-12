const product = { id: 'kettle-1', title: 'Чайник' };
const cart = { title: 'Корзина' };

function createHandlers() {
  return {
    plain: function () {
      return this.title;
    },
    arrow: () => this.title,
    byEvent: (event) => event.currentTarget.title,
  };
}

// createHandlers.call(cart): внутри createHandlers this равен cart.
const handlers = createHandlers.call(cart);

// Браузер вызывает обработчик с this, равным элементу: обработчик.call(элемент).
console.log(handlers.plain.call(product));
console.log(handlers.arrow.call(product));
console.log(handlers.byEvent({ currentTarget: product }));
console.log(handlers.plain.call(cart));
console.log(handlers.plain.call({}));
console.log(handlers.arrow.call({ title: 'Другой' }));
