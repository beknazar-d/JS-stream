export function debounce(fn, delay) {
  let timerId;

  const debounced = (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };

  debounced.cancel = () => {
    clearTimeout(timerId);
  };

  return debounced;
}
