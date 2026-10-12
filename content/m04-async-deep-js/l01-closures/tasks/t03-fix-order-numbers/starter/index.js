export function createNumbering(prefix) {
  return function nextNumber() {
    let last = 0;
    last = last + 1;
    return prefix + '-' + String(last).padStart(4, '0');
  };
}
