export function takeFromQueue(queue, count) {
  return {
    taken: queue.slice(0, count),
    rest: queue.slice(count),
  };
}
