export function debounce(fn, delay) {
  let timer;
  let firstArgs;

  const debounced = (...args) => {
    if (!timer) firstArgs = args;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn(...firstArgs);
    }, delay);
  };

  debounced.cancel = () => {
    clearTimeout(timer);
    timer = undefined;
  };

  return debounced;
}
