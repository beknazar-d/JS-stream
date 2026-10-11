const order = { id: 1042, paid: false, lines: [{ sku: 'A-100', qty: 2 }], note: null };

// Объект превращаем в строку.
const text = JSON.stringify(order);
console.log(text);
console.log(typeof text);

// Строку превращаем обратно в объект.
const back = JSON.parse(text);
console.log(back.lines[0].qty + 1);

// Это новый объект, а не тот же самый, и вложенные тоже новые.
console.log(back === order);
console.log(back.lines[0] === order.lines[0]);
