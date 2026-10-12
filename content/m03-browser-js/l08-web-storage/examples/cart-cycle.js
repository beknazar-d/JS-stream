// Корзина между визитами: записать, «перезагрузить», прочитать.
const storage = new Map();
const KEY = "cart";

function saveCart(cart) {
  storage.set(KEY, JSON.stringify(cart));
}

function loadCart() {
  try {
    const data = JSON.parse(storage.get(KEY) ?? null);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

const prices = { 1: 3490, 2: 5990 };
const total = (cart) => cart.reduce((sum, item) => sum + prices[item.id] * item.qty, 0);

// Визит 1: добавили чайник дважды и блендер.
saveCart([{ id: 1, qty: 2 }, { id: 2, qty: 1 }]);
console.log(storage.get(KEY));

// Визит 2: страница загрузилась заново, переменных нет, есть только хранилище.
const cart = loadCart();
console.log(cart.length);
console.log(total(cart));

// Кто-то записал мусор.
storage.set(KEY, "{oops");
console.log(loadCart().length);
