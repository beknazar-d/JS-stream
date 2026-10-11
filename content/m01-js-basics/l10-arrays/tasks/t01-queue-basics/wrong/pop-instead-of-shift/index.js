export function addOrder(queue, orderId) {
  return queue.push(orderId);
}

export function takeNextOrder(queue) {
  return queue.pop() ?? null;
}

export function lastOrder(queue) {
  return queue.at(-1) ?? null;
}
