export function orderLabel(order) {
  const { id, customer: { name, city = 'не указан' } } = order;
  return `Заказ ${id}: ${name}, ${city}`;
}

export function splitQueue(queue) {
}
