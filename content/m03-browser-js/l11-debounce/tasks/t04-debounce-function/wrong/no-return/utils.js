export function debounce(fn, delay) {
  let timer;
  clearTimeout(timer);
  timer = setTimeout(fn, delay);
}
