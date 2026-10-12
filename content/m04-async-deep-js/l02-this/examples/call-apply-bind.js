'use strict';
// Функция без объекта: this ей задают при вызове.
function describe(prefix, suffix) {
  return prefix + this.id + " (" + this.status + ")" + suffix;
}

const order = { id: "ORD-7", status: "в пути" };

console.log(describe.call(order, "Заказ ", "!"));
console.log(describe.apply(order, ["Заказ ", "?"]));

// bind не вызывает функцию, а создаёт новую с зафиксированным this.
const describeOrder = describe.bind(order, "Заказ ");
console.log(describeOrder("."));

// Привязанный this уже не поменять.
console.log(describeOrder.call({ id: "ORD-8", status: "новый" }, "."));
