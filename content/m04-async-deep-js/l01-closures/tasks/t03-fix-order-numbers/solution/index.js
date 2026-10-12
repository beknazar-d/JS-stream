export function createNumbering(prefix) {
  let last = 0;
  return function nextNumber() {
    last = last + 1;
    return prefix + '-' + String(last).padStart(4, '0');
  };
}
