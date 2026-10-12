export function bindAll(obj) {
  for (const key of Object.keys(obj)) {
    if (typeof obj[key] === 'function') {
      obj[key] = obj[key].bind(obj);
    }
  }
  return obj;
}
