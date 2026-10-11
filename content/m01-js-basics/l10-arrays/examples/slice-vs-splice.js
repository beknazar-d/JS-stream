// Очередь заказов на складе.
const queue = ["A-101", "A-102", "A-103", "A-104"];

// slice копирует кусок, очередь не меняется.
const firstTwo = queue.slice(0, 2);
console.log(firstTwo);
console.log(queue);

// splice вырезает кусок прямо из очереди.
const removed = queue.splice(0, 2);
console.log(removed);
console.log(queue);
