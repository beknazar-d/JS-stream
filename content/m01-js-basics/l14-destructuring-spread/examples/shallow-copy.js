const order = { id: 1042, address: { city: 'Казань' } };

// Копия верхнего уровня: address у обеих переменных один и тот же объект.
const copy = { ...order };
copy.address.city = 'Самара';
console.log(order.address.city);
console.log(copy.address === order.address);

// Правильно: копируем и вложенный объект, который меняем.
const safe = { ...order, address: { ...order.address, city: 'Пермь' } };
console.log(order.address.city);
console.log(safe.address.city);
console.log(safe.address === order.address);
