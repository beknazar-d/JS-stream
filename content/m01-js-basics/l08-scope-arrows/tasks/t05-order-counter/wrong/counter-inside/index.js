export function createOrderCounter(startFrom = 1) {
  return () => {
    let current = startFrom - 1;
    current++;
    return current;
  };
}
