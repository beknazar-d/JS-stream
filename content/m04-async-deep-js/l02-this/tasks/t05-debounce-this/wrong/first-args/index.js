export function debounce(fn, delay) {
  let timerId;
  let savedArgs;

  function debounced(...args) {
    if (timerId === undefined) {
      savedArgs = args;
    }
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = undefined;
      fn.apply(this, savedArgs);
    }, delay);
  }

  debounced.cancel = () => {
    clearTimeout(timerId);
    timerId = undefined;
  };

  return debounced;
}
