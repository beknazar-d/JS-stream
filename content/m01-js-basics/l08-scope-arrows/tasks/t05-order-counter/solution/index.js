export function createOrderCounter(startFrom = 1) {
  let current = startFrom - 1;
  return () => {
    current++;
    return current;
  };
}
