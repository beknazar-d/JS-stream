export function debounce(fn, delay) {
  const debounced = (...args) => {
    setTimeout(() => fn(...args), delay);
  };
  debounced.cancel = () => {};
  return debounced;
}
