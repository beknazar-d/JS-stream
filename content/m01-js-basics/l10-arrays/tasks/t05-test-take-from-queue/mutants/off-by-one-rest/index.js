export function takeFromQueue(queue, count) {
  const size = Math.max(0, count);
  return {
    taken: queue.slice(0, size),
    rest: queue.slice(size + 1),
  };
}
