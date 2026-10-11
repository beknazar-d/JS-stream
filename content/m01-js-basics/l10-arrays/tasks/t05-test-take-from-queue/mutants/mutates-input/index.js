export function takeFromQueue(queue, count) {
  const size = Math.max(0, count);
  const taken = queue.splice(0, size);
  return { taken, rest: queue };
}
