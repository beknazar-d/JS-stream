const order = {
  id: 1042,
  customer: { name: 'Анна Ким', city: 'Казань' },
  coupon: undefined,
  lines: ['кофе', 'фильтры', 'кружка'],
};

// Достаём поля. Для coupon задано значение по умолчанию.
const { id, customer: { name }, coupon = 'без промокода' } = order;
console.log(id, name, coupon);

// Переименование: свойство id кладём в переменную orderId.
const { id: orderId } = order;
console.log(orderId);

// Массив: первый элемент отдельно, остальные собираем через rest.
const [firstItem, ...restItems] = order.lines;
console.log(firstItem);
console.log(restItems);
