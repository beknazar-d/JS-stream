let current;

export function createOrderCounter(startFrom = 1) {
  current = startFrom - 1;
  return () => {
    current++;
    return current;
  };
}
