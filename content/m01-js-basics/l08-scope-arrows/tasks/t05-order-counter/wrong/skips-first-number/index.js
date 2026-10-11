export function createOrderCounter(startFrom = 1) {
  let current = startFrom;
  return () => {
    current++;
    return current;
  };
}
