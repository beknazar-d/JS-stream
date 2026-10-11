export function addOrder(queue, orderId) {
  return queue.push(orderId);
}

export function takeNextOrder(queue) {
  return queue.shift() ?? null;
}

export function lastOrder(queue) {
  return queue.at(-1) ?? null;
}
